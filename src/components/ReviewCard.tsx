import React from "react";
import { ReviewType } from "../types/Review";
import "./ReviewCard.scss";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import logo from "../assets/logo2.png";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import { COLORS } from "../values/colors";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";

const ReviewCard = ({ data }: { data: ReviewType }) => {
  //   console.log("data review card", data);

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: COLORS.darkGreen,
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });
  return (
    <Box sx={{ flexGrow: 1 }} className="rowWrapper">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} className="leftSideGrid">
          <div className="leftSide">
            <img
              src={logo}
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            <div className="name">{data?.user?.name}</div>
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
          <div className="rightSide">
            <div className="ratingAndDate">
              <StyledRating
                name="customized-color"
                readOnly
                value={data?.rating}
                precision={0.1}
                icon={<LocalCafeIcon fontSize="inherit" />}
                emptyIcon={<LocalCafeIcon fontSize="inherit" />}
              />
              <div>{formatDate(data?.createdAt)}</div>
            </div>

            <div className="reviewText">Text: {data?.review}</div>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReviewCard;
