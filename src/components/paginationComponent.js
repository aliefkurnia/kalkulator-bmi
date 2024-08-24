// src/components/PaginationComponent.js
import React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Link } from "react-router-dom";

function PaginationComponent({ currentPage, totalPages, onPageChange }) {
  const handlePageChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <Pagination
      page={currentPage}
      count={totalPages}
      onChange={handlePageChange}
      renderItem={(item) => (
        <PaginationItem component={Link} to={`?page=${item.page}`} {...item} />
      )}
      sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
    />
  );
}

export default PaginationComponent;
