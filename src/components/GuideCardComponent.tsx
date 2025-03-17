import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import farmerImg from "../assets/farmer.avif";
import { useNavigate, useLocation } from "react-router-dom";
type Props = {
  page: string;
};

const GuideCardComponent = ({ page }: Props) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => navigate(`/guide/${page}`)}>
        <CardMedia
          component="img"
          height="140"
          image={farmerImg}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            PAGE: {page}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default GuideCardComponent;
