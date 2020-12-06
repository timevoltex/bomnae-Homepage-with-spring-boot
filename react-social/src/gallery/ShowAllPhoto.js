import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import styled from "styled-components";

function ShowAllPhoto(props) {
  const { onClose, open, data, index } = props;

  const handleClose = () => {
    onClose(index);
  };

  const handleSelectPhoto = (value) => {
    onClose(value);
  };
  return (
    <CustomDialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      maxWidth={false}
      scroll="body"
    >
      <ImageContainer>
        {data.map((image, i) => {
          return (
            <ImageList
              src={image.filepath}
              onClick={() => handleSelectPhoto(i)}
              alt="thumbnail"
              key={data.title}
            />
          );
        })}
      </ImageContainer>
    </CustomDialog>
  );
}

ShowAllPhoto.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  data: PropTypes.any.isRequired,
};

export default ShowAllPhoto;

const CustomDialog = styled(Dialog)`
  max-width: none;
  max-height: none;
`;

const ImageContainer = styled.div`
  margin: 4px auto;
  width: 90%;
`;

const ImageList = styled.img`
  object-fit: cover;
  object-position: center;
  width: 30vw;
  margin-right: 4px;
  height: 30vw;
  @media only screen and (max-width: 460px) {
    width: 25vw;
    height: 25vw;
  }
`;
