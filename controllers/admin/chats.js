import User from "../../models/User.js";
import OpenAI from "openai";
import secrets from "../../config/secrets.js";

const chat_get = async (req, res) => {
  res.render("admin/chat", {
    title: "Chat",
    user: await User.findById(req.params.id),
  });
};

const openai = new OpenAI({ apiKey: secrets.open_ai_api });

async function main(content) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content }],
    model: "gpt-3.5-turbo-16k",
  });

  return completion;
}

const chat_post = async (req, res) => {
  const message = req.body.message;
  try {
    const response = await main(message);
    console.log(response);
    res.status(200).json({ response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMsg: err });
  }
};

export default { chat_get, chat_post };
