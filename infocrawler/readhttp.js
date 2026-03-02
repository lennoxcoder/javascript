const { XMLParser } = require("fast-xml-parser");
const parser = new XMLParser();


const getTechNews = async () => {

  const url = 'https://feeds.feedburner.com/TheHackersNews';

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const xmlData = await response.text();
    let jObj = parser.parse(xmlData);
    const items = jObj.rss.channel.item;

    items.forEach(item => {
    console.log("Título:", item.title);
    console.log("Descrição:", item.description);
    console.log("--------------------------"); })

  } catch (error) {
    console.error('Falha ao buscar notícias:', error);
  }
}

getTechNews();
