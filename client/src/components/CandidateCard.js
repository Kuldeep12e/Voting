import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function Candidate({ id, name, voteCount }) {
  console.log(name , voteCount);
  const IMG =
    "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=1400";

  return (
    <Card sx={{ maxWidth: 345, minWidth: 300 , marginTop : 2 }}>
      <CardHeader
        title={
          <Typography align="center" variant="subtitle1">
            {name}
          </Typography>
        }
      />
      <CardContent sx={{ padding: 0 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={IMG}
        />
      </CardContent>
      <CardActions sx={{ justifyContent: "center" , display :"flex" , flexWrap : "wrap"}}>
        {voteCount && (
          <Typography align="center" variant="">
            <strong>{voteCount}</strong> votes
          </Typography>
        )}
      </CardActions>
    </Card>
  );
}
