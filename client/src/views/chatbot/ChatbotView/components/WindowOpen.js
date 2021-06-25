export const WindowOpen = () => {
  const height = 450;
  const width = 410;
  const top = window.innerHeight - height;
  const left = window.innerWidth - width;

  window.open(
    `${process.env.REACT_APP_API_URL}/chatbot`,
    'menubar=no, resizable=no, scrollbars=no, status=no, location=no',
    `height=${height}, width=${width}, left=${left}, top=${top}`
  );
};
