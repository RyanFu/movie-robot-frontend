import React from 'react';
import { Box, Divider, IconButton, Tooltip, Typography, Skeleton } from "@mui/material";
import LinesEllipsis from 'react-lines-ellipsis'
import RatingLabel from "@/pages/subscribe/components/RatingLabel";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { jumpUrl } from "@/utils/urlUtils";

const ListItem = ({ data, onSub }) => {
    const openUrl = (httpUrl, appUrl) => {
        if (!httpUrl || !appUrl) {
            return;
        }
        jumpUrl(httpUrl, appUrl)
    }
    return (
        <Box>
            <Box
                sx={{
                    // bgcolor: 'background.paper',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    boxShadow: 1,
                    display: 'flex',
                }}
            >
                {data ? <Box
                    component="img"
                    sx={{
                        cursor: 'pointer',
                        height: 150,
                        width: 100,
                        borderRadius: '8px',
                        maxHeight: { xs: 150, md: 200 },
                        maxWidth: { xs: 100, md: 250 },
                    }}
                    alt={data?.title}
                    src={data?.poster_url}
                    onClick={() => openUrl(data?.url, data?.uri)}
                /> : <Skeleton variant="rounded" sx={{
                    cursor: 'pointer',
                    height: 150,
                    width: 100,
                    borderRadius: '8px',
                    maxHeight: { xs: 150, md: 200 },
                    maxWidth: { xs: 100, md: 250 },
                }} />}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        // justifyContent: 'center',
                        pt: 2,
                        ml: 2,
                        minWidth: { md: 350 },
                        flex: 1
                    }}
                >
                    {data ?
                        <>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                <Typography variant="h6" sx={{ cursor: 'pointer' }} gutterBottom component="div" onClick={() => openUrl(data?.url, data?.uri)}>
                                    {data?.title}
                                </Typography>
                                {!data?.isSub && <Tooltip title="订阅">
                                    <IconButton aria-label="play" onClick={() => onSub(data)}>
                                        <AddCircleIcon />
                                    </IconButton></Tooltip>}
                            </Box>
                            <Typography variant="subtitle2" gutterBottom component="div" color="textSecondary">
                                {data?.card_subtitle}
                            </Typography>
                            <RatingLabel rating={data?.rating.value} />
                        </> : <>
                            <Skeleton variant="text" sx={{
                                width: '100%',
                                height: 40,
                                maxWidth: 150,
                            }} />
                            {
                                [1, 2, 3].map((i) => <Skeleton key={i} variant="text" sx={{
                                    width: '100%',
                                    height: 20,
                                    maxWidth: 600,
                                }} />)
                            }

                        </>}
                </Box>
            </Box>
            {
                data ? (
                    data.recommended_reason && <Box sx={{ my: 2, p: 2, bgcolor: 'background.paper', borderRadius: '12px' }}>
                        <Typography variant="subtitle2" gutterBottom component="div" color="textSecondary">
                            <LinesEllipsis text={data?.recommended_reason} maxLine={3}
                                style={{ minHeight: '40px', display: 'flex', alignItems: 'center' }} />
                        </Typography>
                    </Box>
                ) : <Skeleton sx={{ my: 2, p: 2, bgcolor: 'background.paper', borderRadius: '12px' }} />
            }
            <Divider sx={{ my: 4 }} />
        </Box>
    );
}

export default ListItem;