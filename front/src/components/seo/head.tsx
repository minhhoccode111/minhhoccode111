import { Helmet, HelmetData } from 'react-helmet-async';

type HeadProps = {
  title?: string;
  description?: string;
};

const helmetData = new HelmetData({});

export const Head = ({ title = '', description = '' }: HeadProps = {}) => {
  return (
    <Helmet
      helmetData={helmetData}
      title={title ? `${title} | minhhoccode111` : undefined}
      defaultTitle="minhhoccode111"
    >
      <meta name="description" content={description} />
    </Helmet>
  );
};
