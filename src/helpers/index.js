export const centerContent = (screenWidth, contentWidth) => {
  const sidePadding = (screenWidth - contentWidth) / 2;

  return (
    { paddingLeft: sidePadding, paddingRight: sidePadding }
  );
};
