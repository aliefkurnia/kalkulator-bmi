import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import PaginationComponent from "./paginationComponent";
import "./articleSection.css"; // Import CSS file

function ArticleSection({
  articles,
  loading,
  onPageChange,
  currentPage,
  totalPages,
}) {
  return (
    <div>
      <div className="article-grid">
        {loading ? (
          <p>Loading articles...</p>
        ) : (
          articles.map((article, index) => (
            <Card key={index} className="article-card">
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={article.urlToImage || "/default-image.jpg"}
                  alt={article.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {article.description
                      ? `${article.description.substring(0, 100)}...`
                      : "No description available"}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Read more
                  </a>
                </Button>
              </CardActions>
            </Card>
          ))
        )}
      </div>
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default ArticleSection;
