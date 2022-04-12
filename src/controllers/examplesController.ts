import express from "express";
import { Example } from "../models/Example";

const router = express.Router();

/*
|----------------------------------------------------------
| Example Routes
|----------------------------------------------------------
| [Method] | [Route]         | [Function]
| GET      | /               | Get all examples
| GET      | /examples       | Get all examples(sorted by createdAt date) <<--------- !
| POST     | /examples/new   | Add new example
| GET      | /examples/:id   | Fetch a specific example
| POST     | /examples/:id   | Toggle isDone status
| PATCH    | /examples/:id   | Modify an example      
| PUT      | /examples/:id   | Update an example
| DELETE   | /examples/:id   | Delete an example
| 
*/

/**
 * Method: GET
 * Route: '/'
 * Function: Get all examples
 */
router.get("/", async (req, res) => {
  let filters;
  if (Object.keys(req.query).length > 0) {
    filters = { ...req.query };
  }

  try {
    if (!filters) {
      const foundExamples = await Example.find({});
      res.status(200).json(foundExamples);
    }
  } catch (error) {
    res.status(400).json({
      msg: (error as any).message,
    });
  }
});

/**
 * Method: POST
 * Route: '/'
 * Function: Create examples
 */
router.post("/", async (req, res) => {
  try {
    const createdExample = await Example.create(req.body);
    res.status(200).json(createdExample);
  } catch (error) {
    res.status(400).json({
      msg: (error as any).message,
    });
  }
});

/**
 * Method: GET
 * Route: '/:id'
 * Function: Get a specific example
 */
router.get("/:id", async (req, res) => {
  try {
    const example = await Example.findById(req.params.id);

    res.send(example);
  } catch (error) {
    res.status(400).json({
      msg: (error as any).message,
    });
  }
});

/**
 * Method: POST
 * Route: '/:id'
 * Function: Toggle isComplete status
 */
router.post("/isDone/:id", async (req, res) => {
  try {
    const exampleRef = await Example.findById(req.params.id);
    const example = await Example.findOneAndUpdate(
      { _id: req.params.id },
      { isDone: !exampleRef?.isComplete }
    );

    await example?.save();
    res.send(example);
  } catch (error) {
    res.status(400).json({
      msg: (error as any).message,
    });
  }
});

/**
 * Method: PATCH
 * Route: '/:id'
 * Function: Modify an example
 */
router.patch("/:id", async (req, res) => {
  try {
    const example = await Example.findOneAndUpdate(
      { _id: req.params.id },
      { text: req.body.text }
    );
    await example?.save();

    res.send(example);
  } catch (error) {
    res.status(400).json({
      msg: (error as any).message,
    });
  }
});

/**
 * Method: PUT
 * Route: '/:id'
 * Function: Update an example
 */
router.put("/:id", async (req, res) => {
  try {
    const updatedExample = await Example.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedExample);
  } catch (error) {
    res.status(400).json({
      msg: (error as any).message,
    });
  }
});

/**
 * Method: DELETE
 * Route: '/:id'
 * Function: Delete an example
 */
router.delete("/:id", async (req, res) => {
  try {
    const example = await Example.findByIdAndDelete(req.params.id);

    res.send(example);
  } catch (error) {
    res.status(400).json({
      msg: (error as any).message,
    });
  }
});

// TODO: export router
export default router;

/*////////////////////////////////////////////////////////////////////////////////////*/
// NOTE: POST/PUT/PATCH:                                                              //
// ---------------------------------------------------------------------------------- //
//  * POST : always for creating a resource (does not matter if it was duplicated)    //
//      - If the client sends data without any identifier, then we will store the     //
//      data and assign/generate a new identifier.                                    //
//      - If the client again sends the same data without any identifier, then we     //
//      will store the data and assign/generate a new identifier.                     //
//      - *NOTE* Duplication is allowed here.                                         //
//  * PUT : for checking if a resource exsists, then updating; else, create a new     //
//      resource (Update & overwrite)                                                 //
//      - If the client sends data with an identifier, then we will check whether     //
//      that identifier exists. If the identifier exists, we will update the          //
//      resource with the data, else we will create a resource with the data          //
//      and assign/generate a new identifier.                                         //
//   * PATCH : always for updating a resource                                         //
//     - If the client sends data with an identifier, then we will check whether      //
//     that identifier exists. If the identifier exists, we will update the resource  //
//     with the data, else we will throw an exception.                                //
/*////////////////////////////////////////////////////////////////////////////////////*/
