import React from 'react';
import {Box, Card, Chip, Grid, Stack, Typography} from '@mui/material';
import HealthStatus from './HealthStatus';
import styled from "styled-components/macro";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const HealthGrid = ({healthData}) => {
    const theme = useTheme();
    const isLgMd = useMediaQuery(theme.breakpoints.up("md"));

    const ListItem = ({item}) => {
        const {service_name, hours, rate} = item;
        console.log(hours)
        const list = [...Array(23)].map((item, index) => {
            const hourData = hours[index];
            if (!hourData || !hourData.status) return {}
            return {
                title: `${hourData?.hour}时: ${hourData?.status?.DOWN}/${hourData?.status?.UP}（失败/成功）`,
                status: `${hourData?.rate !== 100 ? 'error' : 'success'}`
            }
        })
        const btnIsSuccess = hours.filter(x => x.rate === 100).length === hours.length;
        return (
            <Card sx={{bgcolor: 'background.default', borderRadius: '10px', my: 2}}>
                <Box sx={{p: 3}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Box>
                            <ChipWrapper label={service_name} color={btnIsSuccess ? "success" : 'warning'}/>
                        </Box>
                        <Box>
                            <Stack direction="row" spacing={1}>
                                {
                                    list && list.map(x => (<HealthStatus {...x} />))
                                }
                                <Typography variant="inherit" component="div"
                                            sx={{
                                                width: '40px',
                                                fontSize: '12px',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}>
                                    {rate}%
                                </Typography>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Card>
        )
    }
    return (
        <Grid spacing={6} sx={{mx: isLgMd ? 3 : 0}}>
            {
                healthData?.data?.map(item => {
                    return (
                        <ListItem item={item}/>
                    )
                })
            }
        </Grid>
    );
}

const ChipWrapper = styled(Chip)`
  ${(props) => props.theme.breakpoints.up("md")} {
    width: 130px;
    border-radius: 40px;
  }
  height: 30px;
  width: 100px;
  border-radius: 30px;
  margin-right: 5px;
`;

export default HealthGrid;