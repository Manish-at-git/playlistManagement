import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import Loader from "../components/Loader"
const ConfirmationModal = ({ open, onClose, onConfirm, message, loading }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          boxShadow: 50,
          p: 4,
          borderRadius: 2,
          width:"30%"
        }}
      >
        <Typography variant="h6" component="h2" className="font-semibold">
          Are you sure?
        </Typography>
        <Typography sx={{ mt: 2 }}>{message || ""}</Typography>
       
        <div className="flex justify-center mt-5 gap-10">
          <Button
            type="button"
            onClick={onConfirm}
            sx={{
              background: "linear-gradient(45deg, #B5179E, #7209B7)",
              color: "white",
              borderRadius: "999px",
              padding: "10px 20px",
            }}
          >
            {loading ? "Confirm" : <Loader />}
          </Button>
          <Button
            type="button"
            onClick={onClose}
            sx={{
              background: "linear-gradient(45deg, #B5179E, #7209B7)",
              color: "white",
              borderRadius: "999px",
              padding: "10px 20px",
            }}
          >
            Cancel
          </Button>
        </div>
       
        {/* </Box> */}
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
