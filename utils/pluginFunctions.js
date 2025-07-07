import { Title,Season,Episode,TitleDetails } from './api.js';

function getPluginByName(name) {
  if (!global.plugins) throw new Error("Plugin not found!");

  return global.plugins.find(plugin => plugin.name === name) || null;
}

async function getEpisode(title,season,episodeNumber,plugin) {
  let episode = await plugin.getEpisode(title,season,episodeNumber);
  if (!episode instanceof Episode) {
    throw new Error("plugin episode not instance of api episode!")
  }
  if (!episode.servers) {
    throw new Error("No servers for episode!")
  }

  return episode;
}

async function getTitleDetailsByPlugin(title,plugin) {
  let result = await plugin.getTitleInfo(title);
  if (result instanceof TitleDetails) {
    if (Array.isArray(result.seasons)) {
      const allAreSeasons = result.seasons.every(season => season instanceof Season);
      if (!allAreSeasons) {
        throw new Error("One or more items in results.seasons are not valid api Seasons!");
      }
    }

    return result;
  } else {
    throw new Error("Title details not provided by plugin!");
  }
}

async function combinedSearch(query) {
  let totalResults = [];
  for (const plugin of global.plugins) {
    let searchResult = await plugin.search(query);
    if (Array.isArray(searchResult)) {
      const allAreTitles = searchResult.every(
        item => item instanceof Title
      );

      if (!allAreTitles) {
        console.warn(`Plugin ${plugin.name} returned invalid Title objects.`);
        continue;
      }

       const attributedResults = searchResult.map(title => ({
          pluginName: plugin.name,
          result: title
        }));

      totalResults.push(...attributedResults);
    } else {
      console.warn(`Plugin ${plugin.name} didn't return an array of search results.`);
      continue;
    }
  }

  return totalResults;
}

export { combinedSearch,getTitleDetailsByPlugin,getPluginByName,getEpisode }