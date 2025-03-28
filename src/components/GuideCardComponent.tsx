import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import farmerImg from "../assets/farmer.avif";
import { useNavigate, useLocation } from "react-router-dom";
import { GuideType } from "../types/Guide";

type Props = {
  page: string;
  guide: GuideType;
};

const GuideCardComponent = ({ page, guide }: Props) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ width: 350 }}>
      <CardActionArea onClick={() => navigate(`/guide/${page}`)}>
        <CardMedia
          component="img"
          height="250"
          image={guide.imageLink}
          alt={guide.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {guide.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default GuideCardComponent;
