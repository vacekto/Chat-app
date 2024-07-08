import * as users from './users'
import * as directChannels from './directChannels'
import * as groupChannels from './groupChannels'
import * as messages from './messages'

const MongoAPI = {
    ...users,
    ...directChannels,
    ...groupChannels,
    ...messages
}

export default MongoAPI
