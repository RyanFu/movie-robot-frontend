import React,{useState, useEffect} from 'react';
import {Button, Box, IconButton} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SearchDialog from '@/components/SearchDialog'
import { THEMES } from "@/constants";
import styled from "styled-components/macro";
import {Bell} from "react-feather";

const SearchBox = ( ) => {
  const [open, setOpen] = useState(false);
  return (
    <>
        <IconButton color="inherit" onClick={()=>setOpen(true)}  size="large">
            <SearchIcon />
        </IconButton>
      {/*<SearchWrapper color="inherit" size="large" onClick={()=>setOpen(true)} >*/}
      {/*    <SearchIcon />*/}
      {/*  /!* <ShortCutWrapper sx={{borderRadius: '5px', py:2}}>⌘K</ShortCutWrapper> *!/*/}
      {/*  <SearchText sx={{ml:2, mr: 'auto'}}>搜索...</SearchText>*/}
      {/*</SearchWrapper>*/}
      {open && <SearchDialog open={open} onClose={()=>setOpen(false)} />}
    </>
  );
}

const SearchWrapper = styled(Button)`
  min-height: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  min-width: 120px;
  padding-left: 12px;
  position: relative;
  font-size: 14px;
  cursor: pointer;
  justify-content: flex-start;
  border-radius: 10px;
  color: inherit;

  ${(props) => props.theme.breakpoints.down("sm")} {
    background-color: transparent;
    min-width: 34px;
    padding-right: 0px;
    justify-content: center;
  }
`

const ShortCutWrapper = styled(Box)`
  border-radius: 5px;
  font-size: 12px !important;
  font-weight: 700;
  line-height: 20px;
  margin-left: 4px;
  color: ${(props) => props.theme.header.color};
  border: 1px solid ${(props) => props.theme.palette.primary.main};
  background-color: ${(props) => props.theme.palette.primary.info};
  padding: 0px 6.4px;
  ${(props) => props.theme.breakpoints.down("sm")} {
    display: none;
  }
`;
const SearchText = styled(Box)`
  color: ${(props) => props.theme.header.color};
  ${(props) => props.theme.breakpoints.down("sm")} {
    display: none;
  }
`;

export default SearchBox;