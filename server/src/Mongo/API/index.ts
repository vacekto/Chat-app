import * as users from './users'
import * as directChannels from './directChannels'
import * as messages from './messages'

const MongoAPI = {
    ...users,
    ...directChannels,
    ...messages
}

export default MongoAPI
