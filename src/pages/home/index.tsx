import { tokens } from "../../db/theme";
import { Main } from "../../style";
import { useTheme, Card, Skeleton } from "@mui/material";

const Home = () => {
  const theme = useTheme();
  const colors = tokens(theme?.palette?.mode);

  return (
    <Main className="p-5">
      <Card
        sx={{
          backgroundColor: colors.card[100],
          backgroundImage: "none",
        }}
        className="w-full h-full"
      >
        <Skeleton
          animation="wave"
          variant="rectangular"
          className="w-full h-full bg-transparent"
        />
      </Card>
    </Main>
  );
};

export default Home;
