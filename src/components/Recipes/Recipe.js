import { Link, useNavigate } from "react-router-dom";
import "../../styles/Recipe.css";
import { useEffect, useState } from "react";
import TimeAgo from "./TimeAgo";
import { Avatar, Button, Grid } from "@mui/material";
import { addFavorite, deleteRecipe, popRecipe, removeFavorite } from "../../store/recipiesSlice";
import { useDispatch, useSelector } from "react-redux";
import { Box, Checkbox, Typography } from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { setEditId, setType } from "../../store/addRecipeSlice";

const Recipe = (props) => {
  const { recipe, allowed } = props;
  const user = useSelector((state)=>state.login.user)
  const isConnect = useSelector((state)=>state.login.isConnect)
  const image =
    recipe && recipe.urlImageEditor ? recipe.urlImageEditor : null;
    const [fav,setFav]=useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(deleteRecipe(recipe.id));
    dispatch(popRecipe(recipe.id));
  };

  const setFavorite = (e) => {
    if(e.target.checked){
      dispatch(addFavorite(recipe.id));
      setFav(true);
    }else{
      dispatch(removeFavorite(recipe.id));
      setFav(false);
    }
  }
  const handleEdit = () => {
    dispatch(setType("edit"));
    dispatch(setEditId(recipe.id));
    navigate(`/editRecipe/${recipe.id}`);
  };

  const handleDelete = () => {
    dispatch(deleteRecipe(recipe.id));
    dispatch(popRecipe(recipe.id));
    console.log(recipe);
  };

  useEffect(() => {
    console.log(recipe);
    if(isConnect)
    if(Array.isArray(user.followers)&&user.followers.some(x=>x.recipeId==recipe.id))
    setFav(true)
  }, [recipe]);
  return (
    <div className="card d-inline-block">
      <div className="card-header-box">
        {recipe.urlImage !== "error" && (
          <img src={recipe.urlImage} class="card-img-top" alt="logo" />
        )}
        {recipe.urlImage === "error" && (
          <img src="../../default-recipe.png" class="card-img-top" alt="logo" />
        )}
        {allowed && (
          <Box className="allowed-btns">
            <Button
              className="edit-recipe-btn"
              onClick={handleEdit}
              variant="outlined"
              startIcon={<EditIcon />}
            >
              עריכה
            </Button>
            <Button
              className="delete-recipe-btn"
              onClick={handleDelete}
              variant="outlined"
              startIcon={<DeleteIcon />}
            ></Button>
          </Box>
        )}
        <Checkbox
          icon={<FavoriteBorder className="favorite1" />}
          className="favorite"
          onChange={setFavorite}
          checkedIcon={<Favorite className="favorite2" />}
          checked={fav}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{recipe.name}</h5>
        <p className="card-text">{recipe.description}</p>
        <Link className="link-to-recipe " to={`/recipies/${recipe.id}`}>
          <Button className="btn-to-recipe">למתכון</Button>
        </Link>

        <div className=" card-date">
          <Grid
            container
            direction="row"
            className="bottom-recipe"
            spacing={2}
            columns={16}
          >
            <Grid item sm={6}>
              <Box className="user-box">
              {/* <Link to={`/editors/${recipe.editorId}`}> */}
                <Avatar sx={{ bgcolor: "primary" }}>
                  {
                    <img
                      src={image ? image : "../../images/profile.png"}
                      className="profile-image"
                      alt="profile"
                    />
                  }
                  {/* {user.firstName[0]} */}
                </Avatar>
                {/* </Link> */}
                {/* <Avatar
                  alt="Remy Sharp"
                  src="../../images/profile.png"
                  className="user-avatar"
                /> */}
                <Typography variant="h6" component="h6" className="user-name">
                  {recipe.editorName}
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={6}>
              <TimeAgo date={new Date(recipe.uploadTime)} />
            </Grid>
          </Grid>
          {/* <button onClick={handleClick}>
            delete
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Recipe;
