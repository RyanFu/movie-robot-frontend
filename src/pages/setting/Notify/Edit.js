import React, {useEffect, useState} from "react";
import {NavLink, useNavigate, useSearchParams} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import {Breadcrumbs, Divider as MuiDivider, Link, Typography} from "@mui/material";
import styled from "styled-components/macro";
import {spacing} from "@mui/system";
import message from "@/utils/message";
import {useGetNotifySetting, useSaveNotify, useTestNotify} from "@/api/SettingApi";
import BarkConfigForm from "@/pages/setting/Notify/components/BarkConfigForm";
import PushDeerConfigForm from "@/pages/setting/Notify/components/PushDeerConfigForm";
import QywxConfigForm from "@/pages/setting/Notify/components/QywxConfigForm";
import TelegramConfigForm from "@/pages/setting/Notify/components/TelegramForm";

const Divider = styled(MuiDivider)(spacing);
const getTypeStr = (type) => {
    if (type) {
        if (type === "qywx") {
            return "企业微信"
        }
        return type.replace(/^\S/, s => s.toUpperCase());
    } else {
        return ""
    }
}
const EditNotify = () => {
    const navigate = useNavigate();
    const {data: notifySetting, isLoading} = useGetNotifySetting();
    const {mutateAsync: save, isSaving} = useSaveNotify();
    const {mutateAsync: test, isTesting} = useTestNotify();
    const [title, setTitle] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const [config, setConfig] = useState({bark: null, qywx: null, pushdeer: null})
    const onSubmit = async (values, setMessage) => {
        let params = {"type": searchParams.get("type"), "args": values};
        save(params, {
            onSuccess: res => {
                const {code, message: msg, data} = res;
                if (code === 0) {
                    message.success('更改配置成功，需要重启后才能生效。')
                    navigate("/setting/index");
                } else {
                    message.error(msg)
                }
            }
        });
    }
    const onTest = async (values, setMessage) => {
        let params = {"type": searchParams.get("type"), "args": values};
        test(params, {
            onSuccess: res => {
                const {code, message: msg, data} = res;
                if (code === 0) {
                    message.success(msg);
                } else {
                    message.error(msg);
                }
            }
        });
    }
    useEffect(() => {
        const type = getTypeStr(searchParams.get("type"));
        setTitle(`设置${type}`)
        if (notifySetting && notifySetting.data) {
            const setting = {};
            for (const item of notifySetting.data) {
                setting[item.type] = item;
            }
            setConfig(setting);
        }
    }, [searchParams, notifySetting]);
    return (<React.Fragment>
        <Helmet title={title}/>
        <Typography variant="h3" gutterBottom display="inline">
            {title}
        </Typography>

        <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/setting/index">
                设置
            </Link>
            <Typography>{title}</Typography>
        </Breadcrumbs>
        <Divider my={6}/>
        {searchParams.get("type") === 'qywx' &&
        <QywxConfigForm data={config.qywx} onSubmitEvent={onSubmit} onTestEvent={onTest}/>}
        {searchParams.get("type") === 'bark' &&
        <BarkConfigForm data={config.bark} onSubmitEvent={onSubmit} onTestEvent={onTest}/>}
        {searchParams.get("type") === 'pushdeer' &&
        <PushDeerConfigForm data={config.pushdeer} onSubmitEvent={onSubmit}
                            onTestEvent={onTest}/>}
        {searchParams.get("type") === 'telegram' &&
        <TelegramConfigForm data={config.telegram} onSubmitEvent={onSubmit}
                            onTestEvent={onTest}/>}
    </React.Fragment>);
}
export default EditNotify;