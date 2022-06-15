import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { ResponseFuncs } from "../../../utils/type"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  //function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error })

  // GRAB ID FROM req.query (where next stores params)
  const address: string = req.query.ad as string

  // Potential Responses for /todos/:address
  const handleCase: ResponseFuncs = {
    // RESPONSE FOR GET REQUESTS
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Contract } = await connect() // connect to database
      // res.json(await UserInfo.findOne({ userAddress : `${address}`}).catch(catcher))

      // await UserInfo.findOne({ userAddress : `${address}`}).then((value) => res.json(value))
      Contract.findOne(
        { fundAddress: `${address}` },
        (err, data) => {
          if (data) {
            res.status(200).json({
              text: "Fund found",
              data: data
            });
          } else {
            res.status(404).json({
              text: "Fund not found",
              error: err
            });
          }
        }
      );
    },
    // RESPONSE PUT REQUESTS
    PUT: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Contract } = await connect() // connect to database
      console.log(req.body)
      res.json(
        await Contract.findOneAndUpdate({ fundAddress: `${address}` }, req.body, { upsert: true }).catch(catcher)
      )
    },
  }

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = handleCase[method]
  if (response) response(req, res)
  else res.status(400).json({ error: "No Response for This Request" })
}

export default handler


