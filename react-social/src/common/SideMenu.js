import React, { useState } from 'react'
import './SideMenu.css';
import { ListSubheader, List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons'


function SideMenu({ isRegular, name }) {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
        setOpen(!open)
    }
    if (isRegular) {
        return (
            <List
                component="nav"
                aria-label="regular-list-subheader"
                subheader={
                    <ListSubheader component="div" id="regular-list-subheader">
                        정기전
                    </ListSubheader>
                }>
                <ListItem button>
                    <ListItemText primary="46기" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="47기" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="48기" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="49기" />
                </ListItem>
            </List>
        )
    }
    else if (isRegular === undefined && name !== undefined) {
        return (
            <List
                component="nav"
                aria-label="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-sub-header">
                        졸업전
                         </ListSubheader>
                }>
                <ListItem button>
                    <ListItemText primary="41기 권순후" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="45기 박재현" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="45기 조봉준" />
                </ListItem>
                <ListItem button >
                    <ListItemText primary="47기 정지훈" />
                </ListItem>
            </List>
        )
    }
    else {
        return (
            <List
                component="nav"
                aria-label="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-sub-header">
                        신인전
            </ListSubheader>
                }>
                <ListItem button>
                    <ListItemText primary="자유전" />
                </ListItem>
                <ListItem button onClick={handleClick}>
                    <ListItemText primary="주제전" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button>
                            <ListItemText primary="전체" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="구름" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="바다" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="땅" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="벼락" />
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        )
            
    }
}

export default SideMenu