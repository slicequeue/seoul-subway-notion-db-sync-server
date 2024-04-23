const { body } = require("express-validator");
const { DailyTypeCode, UpDownTypeCode } = require('../gov/metro/api').codes;

class SubwayRequest {
  constructor({stationId, dailyCode, upDownCode}) {
    this.stationId = stationId;
    this.dailyCode = DailyTypeCode[dailyCode];        // dailyCode key to value
    this.upDownCode = UpDownTypeCode[upDownCode];     // upDownCode key to value
  }

  static validate() {
    return [
      body('subway.stationId').isString(),
      body('subway.dailyCode').isString().isIn(Object.keys(DailyTypeCode)),
      body('subway.upDownCode').isString().isIn(Object.keys(UpDownTypeCode)),
    ]
  }
}

class NotionRequest {
  constructor({databaseId}) {
    this.databaseId = databaseId;
  }

  static validate() {
    return [
      body('notion.databaseId').isString()
    ]
  }
}

module.exports = class SubwayNotionSyncRequest {
  constructor({
    subway,
    notion,
  }) {
    this.subway = new SubwayRequest(subway);
    this.notion = new NotionRequest(notion);
  }

  static validate() {
    return [
      body('subway').isObject(),
      ...SubwayRequest.validate(),
      body('notion').isObject(),
      ...NotionRequest.validate()
    ]
  }
}
