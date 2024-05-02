const imageTobase64 = async (image) => {
  const reader = new FileReader();
  reader.readAsDataURL(image);

  const data = await new Promise((resove, reject) => {
    reader.onload = () => resove(reader.result);
    reader.onerror = () => reject(Error);
  });

  return data;
};

export default imageTobase64;
