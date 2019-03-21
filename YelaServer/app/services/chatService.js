

function getEmail() {
    return this.email;
}

function getContent() {
    return this.content;
}

//////////////////////////////////
function Chat(email, content) {
    this.email = email;
    this.content = content;
}

Chat.prototype = {
    getEmail: getEmail,
    getContent: getContent
}

/////////////////////////////////
function getRole() {
    return this.role;
}

function getName() {
    return this.name;
}

function getMessage() {
    return this.message;
}

function Message(name, msg, role) {
    this.name = name;
    this.message = msg;
    this.role = role;
}

Message.prototype = {
    getRole: getRole,
    getName: getName,
    getMessage: getMessage
}

//////////////////////////////////
function putMessage(Message) {
    this.messageList.messages.push({
        name: Message.getName(),
        role: Message.getRole(),
        message: Message.getMessage()
    })
    return this;
}

function getMessageListStr() {
    return JSON.stringify(this.messageList);
}

function setMessageContentList(contentArray) {
    this.messageList.messages = contentArray;
    return this;
}

function MessageList(email, Message) {
    this.messageList = {
        email: email,
        messages: []
    };
    if(Message) {
        this.messageList.messages.push(
            {
                name: Message.getName(),
                role: Message.getRole(),
                message: Message.getMessage()
            }
        )
    }
}

MessageList.prototype = {
    putMessage: putMessage,
    getMessageListStr: getMessageListStr,
    setMessageContentList: setMessageContentList
}

///////////Chat/////////////
module.exports.instanceChat = (email, content) => {
    return new Chat(email, content);
};

//////////Message///////////
module.exports.instanceMessage = (name, message, role) => {
    return new Message(name, message, role);
};

//////////Message List//////
module.exports.instanceMessageList = (email, Message) => {
    return new MessageList(email, Message);
};

module.exports.instanceMessageListWithString = (email, contentString) => {
    var contentObj = JSON.parse(contentString);
    var messageList = new MessageList(email);
    messageList.setMessageContentList(contentObj.messages);
    return messageList;
};