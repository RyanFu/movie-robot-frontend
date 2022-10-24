import React from "react";
import styled, { css } from "styled-components/macro";

import { green, grey, indigo } from "@mui/material/colors";
import { Alert } from '@mui/material'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import {blueGrey} from "@mui/material/colors";

// import { Palette as PaletteIcon } from "@mui/icons-material";
import {
  Box,
  Drawer,
  Fab as MuiFab,
  Grid,
  ListItemButton,
  Typography,
} from "@mui/material";

import { THEMES } from "../constants";
import useTheme from "../hooks/useTheme";
import useStore from "@/store/index";

const DemoButton = styled.div`
  cursor: pointer;
  background: ${(props) => props.theme.palette.background.paper};
  height: 80px;
  border-radius: 0.3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.825rem;
  position: relative;
  border: 1px solid
    ${(props) =>
      !props.active
        ? props.theme.palette.action.selected
        : props.theme.palette.action.active};
`;

const DemoButtonInner = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0 0 0 1px ${(props) => props.theme.palette.action.selected};
  position: relative;

  ${(props) =>
    props.selectedTheme === THEMES.DEFAULT &&
    css`
      background: linear-gradient(-45deg, #23303f 50%, ${grey[100]} 0);
    `}
  ${(props) =>
    props.selectedTheme === THEMES.DARK &&
    css`
      background: #23303f;
    `}
  ${(props) =>
    props.selectedTheme === THEMES.DEEP_DARK &&
    css`
      background: #121212;
    `}
  ${(props) =>
    props.selectedTheme === THEMES.LIGHT &&
    css`
      background: ${grey[100]};
    `}
  ${(props) =>
    props.selectedTheme === THEMES.BLUE &&
    css`
      background: linear-gradient(-45deg, #4782da 50%, ${grey[100]} 0);
    `}
  ${(props) =>
    props.selectedTheme === THEMES.GREEN &&
    css`
      background: linear-gradient(-45deg, ${green[500]} 50%, ${grey[100]} 0);
    `}
  ${(props) =>
    props.selectedTheme === THEMES.INDIGO &&
    css`
      background: linear-gradient(-45deg, ${indigo[500]} 50%, ${grey[100]} 0);
    `}
`;

const DemoTitle = styled(Typography)`
  text-align: center;
`;

const Fab = styled(MuiFab)`
  position: fixed;
  right: ${(props) => props.theme.spacing(8)};
  bottom: ${(props) => props.theme.spacing(8)};
  z-index: 1;
`;

const Wrapper = styled.div`
  width: 258px;
  overflow-x: hidden;
`;

const Heading = styled(ListItemButton)`
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  font-family: ${(props) => props.theme.typography.fontFamily};
  min-height: 56px;

  ${(props) => props.theme.breakpoints.up("sm")} {
    min-height: 64px;
  }
`;

function Demo({ title, themeVariant }) {
  const { theme, setTheme } = useTheme();

  return (
    <Grid item xs={6}>
      <DemoButton
        active={themeVariant === theme}
        onClick={() => setTheme(themeVariant)}
      >
        {
          themeVariant === THEMES.FLOW_SYSTEM
          ? <SettingsBrightnessIcon sx={{width: '50px', height: '50px'}} htmlColor={blueGrey[300]}/>
          : <DemoButtonInner selectedTheme={themeVariant} />
        }
      </DemoButton>
      <DemoTitle variant="subtitle2" gutterBottom>
        {title}
      </DemoTitle>
    </Grid>
  );
}

function Demos() {
  return (
    <Wrapper>
      <Heading>切换主题</Heading>

      <Box px={4} my={3}>
        <Alert icon={false} severity="info">
          选择你喜欢的主题吧！
        </Alert>
      </Box>

      <Box px={4} my={3}>
        <Grid container spacing={3}>
          <Demo title="Dark" themeVariant={THEMES.DARK} />
          <Demo title="Light" themeVariant={THEMES.LIGHT} />
          <Demo title="Default" themeVariant={THEMES.DEFAULT} />
          <Demo title="Blue" themeVariant={THEMES.BLUE} />
          <Demo title="Green" themeVariant={THEMES.GREEN} />
          <Demo title="Indigo" themeVariant={THEMES.INDIGO} />
          <Demo title="Deep_Dark" themeVariant={THEMES.DEEP_DARK} />
          <Demo title="跟随系统" themeVariant={THEMES.FLOW_SYSTEM} />
        </Grid>
      </Box>
    </Wrapper>
  );
}

function Settings() {
  const theme = useStore(state => state.theme)
  const toggleDrawer = (open) => () => {
    theme.toggle(open)
  };
  return (
    <React.Fragment>
      {/* <Fab color="primary" aria-label="Edit" onClick={toggleDrawer(true)}>
        <PaletteIcon />
      </Fab> */}
      <Drawer anchor="right" open={theme.isOpen} onClose={toggleDrawer(false)}>
        <Demos />
      </Drawer>
    </React.Fragment>
  );
}

export default Settings;
