import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { ResponseFuncs } from "../../../utils/type"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  //function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error })

  // Potential Responses
  const handleCase: ResponseFuncs = {
    // RESPONSE FOR GET REQUESTS
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Contract } = await connect() // connect to database
      res.json(await Contract.find({}).catch(catcher))
      console.log(req.body)
    },
    // RESPONSE POST REQUESTS
    // POST: async (req: NextApiRequest, res: NextApiResponse) => {
    //     if(!req.body.name || !req.body.symbol || !req.body.description || !req.body.type || !req.body.min || !req.body.max || !req.body.lockup || !req.body.limit || !req.body. entranceFees || !req.body.exitFees || !req.body.managementFees || !req.body.performanceFees || !req.body.tags || req.body.image) {
    //         return res.status(400).json({
    //             status_code: 0,
    //             error_msg: "Require Params Missing",
    //         });
    //     }
    //   const { Contract } = await connect() // connect to database
    //   console.log(req.body)
    //   res.json(await Contract.create(req.body).catch(catcher))
    // },
  }

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = handleCase[method]
  if (response) response(req, res)
  else res.status(400).json({ error: "No Response for This Request" })
}

export default handler