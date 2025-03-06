import { upload, update } from './src/upload' //Javascript
import { Video } from './src/types' //Javascript

// Get input JSON strings from command line
const args = process.argv.slice(2);
if (args.length < 2) {
    console.error("Please provide credentials and video details as JSON strings.");
    process.exit(1);
}

// const credentials = { email: '...', pass: '...', recoveryemail: '...' }
const credentials = JSON.parse(args[0]);
console.log(credentials)

const input = JSON.parse(args[1]);
console.log(input)

const videos: Video[] = []
for (const data of input) {
    let channelName = data.channelName
    let title = data.title
    let description = data.description
    let thumbnail = data.thumbnail
    let path = data.path
    let tags = data.tags
    
    let video = {
        isNotForKid: true,
        channelName: channelName,
        path: path,
        thumbnail: thumbnail,
        tags: tags,
        title: title,
        description: description,
    }
    videos.push(video)
}

const puppeteerLaunch = { headless: true }
upload(credentials, videos, puppeteerLaunch).then(urls => {
    const output = { urls: urls }
    process.stdout.write(JSON.stringify(output))
})
