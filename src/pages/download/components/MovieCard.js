import {
    Box,
    Card as MuiCard,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Chip as MuiChip,
    Divider,
    Grid,
    IconButton,
    Stack,
    Typography as MuiTypography,
} from "@mui/material";
import React, {useState} from "react";
import styled from "styled-components/macro";
import DownloadBar from "./DownloadBar";
import {spacing} from "@mui/system";
import LinesEllipsis from 'react-lines-ellipsis'
import {ChevronRight as ChevronRightIcon, DeleteForever, Refresh as RefreshIcon} from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import MovieInfoDialog from './MovieInfoDialog'
import {STATUS} from "@/constants";
import {useReLink} from "@/api/DownloadApi";
import message from "@/utils/message";
import ConfirmDialog from "@/components/ConfirmDialog";
import MessageIcon from '@mui/icons-material/Message';

function TitleLabel({title, year, season_index, season_year, movie_type, episode}) {
    if (movie_type === "Movie") {
        return (<span>
            {title}({year})
        </span>)
    } else {
        return (<Box sx={{
            display: 'flex',
            justifyContent: "space-between",
        }}>
            <Box>
                {title}{season_index ? " 第" + season_index + "季" : ""}{episode ? " 第" + episode : episode}
            </Box>
        </Box>);
    }
}

export default function MovieCard(props) {
    const [showConfirmReLink, setShowConfirmReLink] = useState(false);
    const {onDelete, onAnalyze, downloading, onShowSubLog} = props
    const {
        id,
        image,
        title,
        movie_type,
        tname,
        site_name,
        year,
        desc,
        status,
        status_color,
        status_code,
        resolution,
        media_source,
        media_encoding,
        url,
        link_path,
        season_index,
        season_year,
        episode,
        source_type,
        sub_id,
        sub_type,
        gmt_create
    } = props.data;
    const {mutateAsync: reLink, isLinking} = useReLink();
    const getEpisodeStr = (episode) => {
        if (episode) {
            if (episode.length <= 2) {
                return episode.join(",") + "集";
            } else {
                return episode[0] + "-" + episode[episode.length - 1] + "集"
            }
        }
    }
    const handleReLink = () => {
        reLink({id}, {
            onSuccess: resData => {
                const {code, message: msg, data} = resData;
                if (code === 0) {
                    message.success(msg);
                    setShowConfirmReLink(false);
                } else {
                    message.error(msg);
                }
            },
            onError: error => message.error(error.message)
        })
    }
    const handleAnalyze = () => {
        if (source_type && source_type === "unknown") {
            setShowConfirmReLink(true);
        } else {
            onAnalyze({open: true, year: year, id: id, name: title, link_path: link_path, movie_type: movie_type})
        }
    };
    const handleDelete = () => {
        onDelete({open: true, id})
    }
    const handleShowSubLog = () => {
        if (onShowSubLog) {
            onShowSubLog({subId: sub_id, subType: sub_type, title: `${title}(${year})`, time: gmt_create});
        }
    }
    const CardWrapper = useMediaQuery((theme) => theme.breakpoints.up('md')) ? CardContainer : Card;
    return (
        <Grid item md={6} lg={4} xl={3} key={id} style={{width: '100%'}}>
            <CardWrapper>
                {/*图片*/}
                <CardActionArea target="_blank" href={url || '#'}>
                    <CardMedia style={{height: '220px', display: 'flex'}} image={image || '/static/img/default.png'}
                               title={title}
                               act>
                        {
                            title && <TitleConainer variant="subtitle1" component="h3" noWrap>
                                <TitleLabel movie_type={movie_type} title={title} year={year}
                                            season_index={season_index} season_year={season_year}
                                            episode={getEpisodeStr(episode)}/>
                                <IconButton sx={{color: '#fff'}}><ChevronRightIcon/> </IconButton>
                            </TitleConainer>
                        }
                    </CardMedia>
                </CardActionArea>
                <CardContent>
                    {/*进度条*/}
                    {status_code === 0 && downloading && <DownloadBar downloading={downloading} id={id}/>}
                    {/*标签*/}
                    <Stack direction="row" spacing={1}>
                        {
                            // 如果当前状态码是进行中，并且下载正好完成，就修改为已完成
                            status_code === 0 && !downloading
                                ? <Chip label={STATUS[1].msg} color={STATUS[1].color}/>
                                : <Chip label={status} color={status_color}/>
                        }
                        {media_source && <Chip label={media_source} color="primary"/>}
                        {resolution && <Chip label={resolution} color="success"/>}
                        {media_encoding && <Chip label={media_encoding} color="info"/>}
                    </Stack>
                    {/*影片描述*/}
                    <Typography mb={1} color="textSecondary" component="p">
                        <LinesEllipsis text={desc} maxLine={2} style={{minHeight: '40px'}}/>
                    </Typography>
                </CardContent>
                <Divider my={1}/>
                <ConfirmDialog open={showConfirmReLink} onClose={() => setShowConfirmReLink(false)} onOk={handleReLink}>
                    确定要立即重新原样整理吗？
                </ConfirmDialog>
                <CardActions container={true} sx={{justifyContent: 'flex-end'}}>
                    {sub_id &&
                    <IconButton onClick={handleShowSubLog} aria-label="为什么被下载" size="small"
                                sx={{marginRight: '9px'}}>
                        <MessageIcon/>
                    </IconButton>}
                    {status_code !== 2 && <MovieInfoDialog id={id}/>}
                    {
                        status_code !== 2 &&
                        <IconButton onClick={handleAnalyze} aria-label="重新识别" size="small" sx={{marginLeft: '9px'}}>
                            <RefreshIcon/>
                        </IconButton>
                    }
                    <IconButton onClick={handleDelete} aria-label="删除" size="small">
                        <DeleteForever/>
                    </IconButton>
                </CardActions>
            </CardWrapper>
        </Grid>
    )
};
const Card = styled(MuiCard)(spacing);
const Typography = styled(MuiTypography)(spacing);
const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 85%;
  background-color: ${(props) => props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
  margin-bottom: ${(props) => props.theme.spacing(4)};
`;
const TitleConainer = styled(Typography)`
    background: #313132a1;
    color: #fff;
    margin-top: auto;
    width: 100%;
    padding-left: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CardContainer = styled(Card)`
  transition: all 0.2s ease-in-out;
  &:hover {
    position: relative;
    transform: translateY(-6px);
    box-shadow: 0px 3px 15px rgba(0,0,0,0.5);
  }
`;