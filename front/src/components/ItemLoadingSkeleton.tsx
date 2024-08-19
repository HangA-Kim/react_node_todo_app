import * as React from "react";
import {
  CardActions,
  CardContent,
  Box,
  Divider,
  Skeleton,
} from "@mui/material";
import { CustomCard } from "./ItemCard";


const ItemLoadingSkeleton = () => {
  return (
    <div>
      <CustomCard>
        <CardContent>
          <Skeleton animation="wave" />

          <Divider />
          <Box
            sx={{
              display: "flex",
              alignItems: "center", // 세로 가운데 정렬
              justifyContent: "center",
              height: "100%", // 부모 컨테이너의 전체 높이 사용
            }}
          >
            <Skeleton width={"100%"} height={"80px"} animation="wave" />
          </Box>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "5px",
            marginRight: "5px",
            marginBottom: "5px",
          }}
        >
          <Skeleton width={"50%"} height={"50px"} animation="wave" />
          <Skeleton width={"20%"} height={"50px"} animation="wave" />
        </CardActions>
      </CustomCard>
    </div>
  );
};

export default ItemLoadingSkeleton;
