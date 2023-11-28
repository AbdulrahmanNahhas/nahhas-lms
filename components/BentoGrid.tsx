"use client";

import * as React from "react";
import Box from "@mui/system/Box";
import Grid from "@mui/system/Unstable_Grid";

const Item = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-accent border text-center p-4">{children}</div>
);

export default function BentoGrid() {
  return (
    <Box sx={{ flexGrow: 1 }} className="container">
      <Grid container spacing={2}>
        <Grid xs={6} md={8}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid xs={6} md={4}>
          <Item>xs=6 md=4</Item>
        </Grid>
        <Grid xs={6} md={4}>
          <Item>xs=6 md=4</Item>
        </Grid>
        <Grid xs={6} md={8}>
          <Item>xs=6 md=8</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
