class Title {
  /**
   * @param {Object} options
   * @param {string} options.name
   * @param {string} options.image
   * @param {Object} [options.metadata] - optional extra info like year, genre, rating
   */
  constructor({name,image,metadata}) {
    this.name = name
    this.imageUrl = image
    this.metadata = metadata
  }
}

class Season {
  /**
   * @param {Object} options
   * @param {number} options.num - season number
   * @param {number} options.episodeCount
   * @param {string[]} options.episodeNames
   */
  constructor({num, episodeCount, episodeNames}) {
    this.number = num
    this.episodeCount = episodeCount
    this.episodeNames = episodeNames
  }
}

class Episode {
  /**
   * @param {Object} options
   * @param {Servers} options.servers - streaming links
   * @param {string} options.name - episode name/title
   * @param {number} options.episodeNum
   * @param {number} options.seasonNum
   */
  constructor({servers, name, episodeNum, seasonNum}) {
    this.servers = servers
    this.name = name
    this.episodeNum = episodeNum
    this.seasonNum = seasonNum
  }
}

class Server {
  /**
   * @param {Object} options
   * @param {string} options.url
   * @param {string} [options.name] - e.g. "Server 1", "FastStream"
   * @param {string} [options.quality] - e.g. "1080p"
   * @param {string} [options.language] - e.g. "en"
   */
  constructor({ url, name, quality, language }) {
    this.url = url;
    this.name = name || "Server";
    this.quality = quality || "Unknown";
    this.language = language || "Unknown";
  }
}

class Servers {
  constructor(servers) {
    this.servers = servers;
  }
}

class TitleDetails {
  /**
   * @param {Object} options
   * @param {string} options.name
   * @param {string} options.image
   * @param {Season[]} options.seasons
   * @param {Object} [options.metadata]
   */
  constructor({name, image, seasons, metadata}) {
    this.name = name
    this.image = image
    this.seasons = seasons
    this.metadata = metadata
  }
}

async function httpGet(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`HTTP error ${res.status}`);
  return await res.json();
}

export { Title,Episode,Season,TitleDetails,Servers,Server,httpGet }