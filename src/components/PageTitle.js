import { Helmet } from "react-helmet-async";

const PageTitle = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | F.O.C</title>
    </Helmet>
  );
};

export default PageTitle;
