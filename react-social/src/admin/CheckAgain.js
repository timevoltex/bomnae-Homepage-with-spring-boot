import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

function CheckDialog(props) {
  const { onClose, value, open, onSubmit } = props;

  const handleSubmit = () => {
    onSubmit();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">확인해주세요</DialogTitle>
      <List>
        <ListItem>
          <ListItemText primary={`제목: ${value.title}` || ""} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`설명: ${value.content}` || ""} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`작가: ${value.artist}` || ""} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`기수: ${value.generation}` || ""} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`사진전 유형: ${value.format}` || ""} />
        </ListItem>
        <ListItem button onClick={handleClose}>
          <ListItemText primary="취소" />
        </ListItem>
        <ListItem button onClick={handleSubmit}>
          <ListItemText primary="제출" />
        </ListItem>
      </List>
    </Dialog>
  );
}

CheckDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function CheckAgain(props) {
  const [open, setOpen] = React.useState(false);
  const { value, onSubmit } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        제출
      </Button>
      <CheckDialog
        open={open}
        onClose={handleClose}
        value={value}
        onSubmit={onSubmit}
      />
    </div>
  );
}
