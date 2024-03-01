import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { SUCCESS_MSG } from "../constants/messages";

const ModalPopup = ({ isModalPopupOpen, onCloseModalPopup }) => {
  const navigate = useNavigate();
  const onLinkClickHandler = (pageUrl) => {
    console.log(pageUrl);
    navigate(pageUrl);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Dialog
        open={isModalPopupOpen.open}
        // onClose={onCloseModalPopup}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ p: 0.2 }}>
          <IconButton sx={{ float: "right" }} onClick={onCloseModalPopup}>
            <CloseIcon></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
        <DialogContent>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            {isModalPopupOpen.message || SUCCESS_MSG}
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseModalPopup}>Cancel</Button>
          <Button onClick={() => onLinkClickHandler("/login")}>Login</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalPopup;
