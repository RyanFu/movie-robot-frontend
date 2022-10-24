import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField} from "@mui/material";
import React, {useEffect} from "react";
import {useSmartForm} from "@/components/SmartForm";

export const ShareDialog = ({subId, open, handleClose, handleSubmit, name, desc}) => {
    const smartForm = useSmartForm({
        initValues: {
            name: '',
            desc: ''
        }
    });
    useEffect(() => {
        smartForm.setFieldValue('name', name ? name : "")
        smartForm.setFieldValue('desc', desc ? desc : "")
    }, [name, desc]);
    return (<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            分享订阅规则给其他用户
        </DialogTitle>
        <DialogContent>
            <Grid spacing={4} sx={{mt: 1}} container>
                <Grid item xs={12}>
                    <TextField
                        type="text"
                        name="name"
                        label="规则名称"
                        helperText={"其他用户看到规则时的名称"}
                        fullWidth
                        my={3}
                        value={smartForm.values.name}
                        onChange={smartForm.handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="text"
                        name="desc"
                        label="描述"
                        helperText={"简单介绍一下你的订阅规则有什么用，以及分享一点这条规则的设计思考吧"}
                        fullWidth
                        my={3}
                        value={smartForm.values.desc}
                        onChange={smartForm.handleChange}
                    />
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>取消</Button>
            <Button onClick={() => handleSubmit(subId, smartForm.values)} autoFocus>
                分享
            </Button>
        </DialogActions>
    </Dialog>);
}