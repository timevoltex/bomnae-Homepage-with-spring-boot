import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import styled from "styled-components";

function ScaleUp(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <CustomDialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open.open}
      maxWidth={false}
      scroll="body"
    >
      <ScaleImage src={open.filepath} className={open.landscape} />
    </CustomDialog>
  );
}

ScaleUp.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.object.isRequired,
};

export default ScaleUp;

const CustomDialog = styled(Dialog)`
  max-width: none;
  max-height: none;
`;

const ScaleImage = styled.img`
  &.landscape {
    width: 64vmax;
  }
  &.portrait {
    width: 64vmin;
  }
  @media only screen and (max-width: 460px) {
    &.landscape {
      width: auto;
      height: 64vmax;
    }
    &.portrait {
      width: 64vmax;
    }
  }
`;
