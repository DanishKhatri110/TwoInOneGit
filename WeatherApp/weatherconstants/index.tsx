// export const apiKey = '5f9769d1a15449d89e691514241111';

export const apiKey = 'f5d181c88f574d53878123532242611';

type weatherCondition =
    | 'Partly cloudy'
    | 'Moderate rain'
    | 'Patchy rain possible'
    | 'Sunny'
    | 'Clear'
    | 'Overcast'
    | 'Cloudy'
    | 'Light rain'
    | 'Light rain shower'
    | 'Moderate rain at times'
    | 'Heavy rain'
    | 'Heavy rain at times'
    | 'Moderate or heavy freezing rain'
    | 'Moderate or heavy rain shower'
    | 'Moderate or heavy rain with thunder'
    | 'Patchy rain nearby'
    | 'Light drizzle'
    | 'Patchy light drizzle'
    | 'Patchy light rain'
    | 'Light snow showers'
    | 'Mist'
    | 'Sleet'
    | 'Fog'
    | 'Hail'
    | 'Snow'
    | 'other';

export const weatherImages: Record<weatherCondition, any> = {
    'Partly cloudy': require('../weatherAssets/partlycloudy.png'),
    'Moderate rain': require('../weatherAssets/moderaterain.png'),
    'Patchy rain possible': require('../weatherAssets/moderaterain.png'),
    'Sunny': require('../weatherAssets/sunny.png'),
    'Clear': require('../weatherAssets/sunny.png'),
    'Overcast': require('../weatherAssets/cloud.png'),
    'Cloudy': require('../weatherAssets/cloud.png'),
    'Light rain': require('../weatherAssets/moderaterain.png'),
    'Light rain shower': require('../weatherAssets/moderaterain.png'),
    'Moderate rain at times': require('../weatherAssets/moderaterain.png'),
    'Heavy rain': require('../weatherAssets/heavyrain.png'),
    'Heavy rain at times': require('../weatherAssets/heavyrain.png'),
    'Moderate or heavy freezing rain': require('../weatherAssets/heavyrain.png'),
    'Moderate or heavy rain shower': require('../weatherAssets/heavyrain.png'),
    'Moderate or heavy rain with thunder': require('../weatherAssets/heavyrain.png'),
    'Patchy rain nearby': require('../weatherAssets/patchyrain.png'),
    'Light drizzle': require('../weatherAssets/lightdrizzle.png'),
    'Patchy light drizzle': require('../weatherAssets/lightdrizzle.png'),
    'Patchy light rain': require('../weatherAssets/lightdrizzle.png'),
    'Light snow showers': require('../weatherAssets/Lightsnowshowers.png'),
    'Mist': require('../weatherAssets/mist.png'),
    'Sleet': require('../weatherAssets/sleet.png'),
    'Fog': require('../weatherAssets/foggy.png'),
    'Hail': require('../weatherAssets/hail.png'),
    'Snow': require('../weatherAssets/snow.png'),
    'other': require('../weatherAssets/moderaterain.png'),
};
