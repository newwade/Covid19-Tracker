import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./infobox.css";
function InfoBox({ title, isRed, isGreen, cases, active, total, ...props }) {
  return (
    <Card
      onClick={props.onClick}
      className={`infobox ${active && "infobox--selected"} ${
        isRed && "infoxbox--red"
      }`}
    >
      <CardContent>
        <Typography className="infobox__title" color="textSecondary">
          {title}
        </Typography>
        <h2
          className={`infoBox__cases ${!isRed && "infoBox__cases--green"} ${
            !isGreen && "infoBox__cases--red"
          }`}
        >
          {cases}
        </h2>
        <Typography className="infobox__total" color="textSecondary">
          {total}Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
