import React, { useEffect, useState, useRef } from 'react';
import ListItem from './ListItem';
import { Button, Divider, Grid, Stack, Typography } from "@mui/material";
import { useGetDoubanSuggestion } from "@/api/MovieApi";
import SubscribeDialog from "@/pages/subscribe/components/SubscribeDialog";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const DataFlowList = () => {
    const [subInfo, setSubInfo] = useState();
    const [setsubItemIds, setsetsubItemIds] = useState([])
    const { data: mediaList,
        fetchNextPage,
        hasNextPage,
        isFetching
    } = useGetDoubanSuggestion();

    const onSub = (media) => {
        setSubInfo({
            id: media.id,
            name: media.title,
            year: media.year
        });
    }
    const onSubComplete = () => {
        setsetsubItemIds([...setsubItemIds, subInfo.id])
        setSubInfo(null);
    }

    const ref = useRef(null)
    const entry = useIntersectionObserver(ref)

    useEffect(() => {
        if (entry?.isIntersecting && hasNextPage && !isFetching) {
            fetchNextPage();
        }
    }, [entry?.isIntersecting, hasNextPage, isFetching])

    return (
        <Grid>
            <Grid item>
                <Typography variant="h5" mt={2} gutterBottom>
                    推荐
                </Typography>
            </Grid>
            <Divider sx={{ my: 3 }} />
            {subInfo && <SubscribeDialog
                open={subInfo}
                onComplete={onSubComplete}
                handleClose={() => setSubInfo(null)}
                data={({ id: subInfo?.id, name: subInfo?.name, year: subInfo?.year })}
            />}
            <Stack spacing={2}>
                {
                    mediaList && (mediaList.pages || []).map(pages => pages.items.map(
                        item =>
                            <ListItem key={item.id} data={{ ...item, isSub: setsubItemIds.includes(item.id) }} onSub={onSub} />
                    ))
                }
                {(hasNextPage && isFetching) || !mediaList
                    ? Array.from(new Array(10)).map((_item, index) => (
                        <ListItem key={index} />
                    ))
                    : <></>}
                <div style={{ position: 'relative', top: '-400px', height: '4px' }} ref={ref} />
            </Stack>
            {
                !hasNextPage && <Button fullWidth disabled>没有更多了</Button>
            }
        </Grid >
    );
}

export default DataFlowList;