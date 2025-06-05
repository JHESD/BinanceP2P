const PagePlaceholder = ({ title }) => {
  return (
    <div className="text-center mt-32">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>
      <p className="text-lg text-gray-600">Esta es la ventana "{title}".</p>
    </div>
  );
};

export default PagePlaceholder;
