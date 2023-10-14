export const isEmpty = (data) => {
  if (data === null || data === undefined) {
    return true
  }

  switch (typeof data) {
    case 'object':
      if (Array.isArray(data)) {
        return data.length === 0;
      } else {
        return Object.keys(data).length === 0;
      }

    case 'string':
      return data.trim().length === 0;

    case 'number':
      return data === 0;

    case 'boolean':
      return !data;

    default:
      return true;
  }
};

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const downloadFile = async (fileUrl, fileName) => {
  try {
    const response = await fetch(fileUrl); // Ganti URL dengan URL file yang ingin diunduh
    const blob = await response.blob();

    // Membuat URL objek dari blob
    const url = window.URL.createObjectURL(new Blob([blob]));

    // Membuat elemen anchor untuk mengunduh file
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${fileName}.${fileUrl.split('.').pop()}`); // Ganti 'file.pdf' dengan nama file yang ingin Anda berikan pada file yang diunduh
    document.body.appendChild(link);

    // Mengklik elemen anchor untuk memulai pengunduhan
    link.click();

    // Menghapus URL objek setelah pengunduhan selesai
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};