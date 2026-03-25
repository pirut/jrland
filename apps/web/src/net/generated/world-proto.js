/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const jrland = $root.jrland = (() => {

    /**
     * Namespace jrland.
     * @exports jrland
     * @namespace
     */
    const jrland = {};

    jrland.world = (function() {

        /**
         * Namespace world.
         * @memberof jrland
         * @namespace
         */
        const world = {};

        world.v1 = (function() {

            /**
             * Namespace v1.
             * @memberof jrland.world
             * @namespace
             */
            const v1 = {};

            /**
             * BlockType enum.
             * @name jrland.world.v1.BlockType
             * @enum {number}
             * @property {number} BLOCK_TYPE_AIR=0 BLOCK_TYPE_AIR value
             * @property {number} BLOCK_TYPE_GRASS=1 BLOCK_TYPE_GRASS value
             * @property {number} BLOCK_TYPE_DIRT=2 BLOCK_TYPE_DIRT value
             * @property {number} BLOCK_TYPE_STONE=3 BLOCK_TYPE_STONE value
             * @property {number} BLOCK_TYPE_WOOD=4 BLOCK_TYPE_WOOD value
             * @property {number} BLOCK_TYPE_LEAF=5 BLOCK_TYPE_LEAF value
             * @property {number} BLOCK_TYPE_GLASS=6 BLOCK_TYPE_GLASS value
             */
            v1.BlockType = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "BLOCK_TYPE_AIR"] = 0;
                values[valuesById[1] = "BLOCK_TYPE_GRASS"] = 1;
                values[valuesById[2] = "BLOCK_TYPE_DIRT"] = 2;
                values[valuesById[3] = "BLOCK_TYPE_STONE"] = 3;
                values[valuesById[4] = "BLOCK_TYPE_WOOD"] = 4;
                values[valuesById[5] = "BLOCK_TYPE_LEAF"] = 5;
                values[valuesById[6] = "BLOCK_TYPE_GLASS"] = 6;
                return values;
            })();

            /**
             * ChatScope enum.
             * @name jrland.world.v1.ChatScope
             * @enum {number}
             * @property {number} CHAT_SCOPE_LOCAL=0 CHAT_SCOPE_LOCAL value
             * @property {number} CHAT_SCOPE_GLOBAL=1 CHAT_SCOPE_GLOBAL value
             */
            v1.ChatScope = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "CHAT_SCOPE_LOCAL"] = 0;
                values[valuesById[1] = "CHAT_SCOPE_GLOBAL"] = 1;
                return values;
            })();

            /**
             * EntityKind enum.
             * @name jrland.world.v1.EntityKind
             * @enum {number}
             * @property {number} ENTITY_KIND_UNKNOWN=0 ENTITY_KIND_UNKNOWN value
             * @property {number} ENTITY_KIND_PLAYER=1 ENTITY_KIND_PLAYER value
             * @property {number} ENTITY_KIND_TREE=2 ENTITY_KIND_TREE value
             * @property {number} ENTITY_KIND_CREATURE=3 ENTITY_KIND_CREATURE value
             * @property {number} ENTITY_KIND_STRUCTURE=4 ENTITY_KIND_STRUCTURE value
             */
            v1.EntityKind = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "ENTITY_KIND_UNKNOWN"] = 0;
                values[valuesById[1] = "ENTITY_KIND_PLAYER"] = 1;
                values[valuesById[2] = "ENTITY_KIND_TREE"] = 2;
                values[valuesById[3] = "ENTITY_KIND_CREATURE"] = 3;
                values[valuesById[4] = "ENTITY_KIND_STRUCTURE"] = 4;
                return values;
            })();

            v1.Vector3 = (function() {

                /**
                 * Properties of a Vector3.
                 * @memberof jrland.world.v1
                 * @interface IVector3
                 * @property {number|null} [x] Vector3 x
                 * @property {number|null} [y] Vector3 y
                 * @property {number|null} [z] Vector3 z
                 */

                /**
                 * Constructs a new Vector3.
                 * @memberof jrland.world.v1
                 * @classdesc Represents a Vector3.
                 * @implements IVector3
                 * @constructor
                 * @param {jrland.world.v1.IVector3=} [properties] Properties to set
                 */
                function Vector3(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Vector3 x.
                 * @member {number} x
                 * @memberof jrland.world.v1.Vector3
                 * @instance
                 */
                Vector3.prototype.x = 0;

                /**
                 * Vector3 y.
                 * @member {number} y
                 * @memberof jrland.world.v1.Vector3
                 * @instance
                 */
                Vector3.prototype.y = 0;

                /**
                 * Vector3 z.
                 * @member {number} z
                 * @memberof jrland.world.v1.Vector3
                 * @instance
                 */
                Vector3.prototype.z = 0;

                /**
                 * Creates a new Vector3 instance using the specified properties.
                 * @function create
                 * @memberof jrland.world.v1.Vector3
                 * @static
                 * @param {jrland.world.v1.IVector3=} [properties] Properties to set
                 * @returns {jrland.world.v1.Vector3} Vector3 instance
                 */
                Vector3.create = function create(properties) {
                    return new Vector3(properties);
                };

                /**
                 * Encodes the specified Vector3 message. Does not implicitly {@link jrland.world.v1.Vector3.verify|verify} messages.
                 * @function encode
                 * @memberof jrland.world.v1.Vector3
                 * @static
                 * @param {jrland.world.v1.IVector3} message Vector3 message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Vector3.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                        writer.uint32(/* id 1, wireType 5 =*/13).float(message.x);
                    if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                        writer.uint32(/* id 2, wireType 5 =*/21).float(message.y);
                    if (message.z != null && Object.hasOwnProperty.call(message, "z"))
                        writer.uint32(/* id 3, wireType 5 =*/29).float(message.z);
                    return writer;
                };

                /**
                 * Encodes the specified Vector3 message, length delimited. Does not implicitly {@link jrland.world.v1.Vector3.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof jrland.world.v1.Vector3
                 * @static
                 * @param {jrland.world.v1.IVector3} message Vector3 message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Vector3.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Vector3 message from the specified reader or buffer.
                 * @function decode
                 * @memberof jrland.world.v1.Vector3
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jrland.world.v1.Vector3} Vector3
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Vector3.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.jrland.world.v1.Vector3();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.x = reader.float();
                                break;
                            }
                        case 2: {
                                message.y = reader.float();
                                break;
                            }
                        case 3: {
                                message.z = reader.float();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Vector3 message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof jrland.world.v1.Vector3
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {jrland.world.v1.Vector3} Vector3
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Vector3.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Vector3 message.
                 * @function verify
                 * @memberof jrland.world.v1.Vector3
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Vector3.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.x != null && message.hasOwnProperty("x"))
                        if (typeof message.x !== "number")
                            return "x: number expected";
                    if (message.y != null && message.hasOwnProperty("y"))
                        if (typeof message.y !== "number")
                            return "y: number expected";
                    if (message.z != null && message.hasOwnProperty("z"))
                        if (typeof message.z !== "number")
                            return "z: number expected";
                    return null;
                };

                /**
                 * Creates a Vector3 message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof jrland.world.v1.Vector3
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {jrland.world.v1.Vector3} Vector3
                 */
                Vector3.fromObject = function fromObject(object) {
                    if (object instanceof $root.jrland.world.v1.Vector3)
                        return object;
                    let message = new $root.jrland.world.v1.Vector3();
                    if (object.x != null)
                        message.x = Number(object.x);
                    if (object.y != null)
                        message.y = Number(object.y);
                    if (object.z != null)
                        message.z = Number(object.z);
                    return message;
                };

                /**
                 * Creates a plain object from a Vector3 message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof jrland.world.v1.Vector3
                 * @static
                 * @param {jrland.world.v1.Vector3} message Vector3
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Vector3.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.x = 0;
                        object.y = 0;
                        object.z = 0;
                    }
                    if (message.x != null && message.hasOwnProperty("x"))
                        object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
                    if (message.y != null && message.hasOwnProperty("y"))
                        object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
                    if (message.z != null && message.hasOwnProperty("z"))
                        object.z = options.json && !isFinite(message.z) ? String(message.z) : message.z;
                    return object;
                };

                /**
                 * Converts this Vector3 to JSON.
                 * @function toJSON
                 * @memberof jrland.world.v1.Vector3
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Vector3.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for Vector3
                 * @function getTypeUrl
                 * @memberof jrland.world.v1.Vector3
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                Vector3.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/jrland.world.v1.Vector3";
                };

                return Vector3;
            })();

            v1.InventorySlot = (function() {

                /**
                 * Properties of an InventorySlot.
                 * @memberof jrland.world.v1
                 * @interface IInventorySlot
                 * @property {string|null} [itemId] InventorySlot itemId
                 * @property {number|null} [count] InventorySlot count
                 * @property {number|null} [hotbarIndex] InventorySlot hotbarIndex
                 * @property {number|null} [blockType] InventorySlot blockType
                 */

                /**
                 * Constructs a new InventorySlot.
                 * @memberof jrland.world.v1
                 * @classdesc Represents an InventorySlot.
                 * @implements IInventorySlot
                 * @constructor
                 * @param {jrland.world.v1.IInventorySlot=} [properties] Properties to set
                 */
                function InventorySlot(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * InventorySlot itemId.
                 * @member {string} itemId
                 * @memberof jrland.world.v1.InventorySlot
                 * @instance
                 */
                InventorySlot.prototype.itemId = "";

                /**
                 * InventorySlot count.
                 * @member {number} count
                 * @memberof jrland.world.v1.InventorySlot
                 * @instance
                 */
                InventorySlot.prototype.count = 0;

                /**
                 * InventorySlot hotbarIndex.
                 * @member {number} hotbarIndex
                 * @memberof jrland.world.v1.InventorySlot
                 * @instance
                 */
                InventorySlot.prototype.hotbarIndex = 0;

                /**
                 * InventorySlot blockType.
                 * @member {number} blockType
                 * @memberof jrland.world.v1.InventorySlot
                 * @instance
                 */
                InventorySlot.prototype.blockType = 0;

                /**
                 * Creates a new InventorySlot instance using the specified properties.
                 * @function create
                 * @memberof jrland.world.v1.InventorySlot
                 * @static
                 * @param {jrland.world.v1.IInventorySlot=} [properties] Properties to set
                 * @returns {jrland.world.v1.InventorySlot} InventorySlot instance
                 */
                InventorySlot.create = function create(properties) {
                    return new InventorySlot(properties);
                };

                /**
                 * Encodes the specified InventorySlot message. Does not implicitly {@link jrland.world.v1.InventorySlot.verify|verify} messages.
                 * @function encode
                 * @memberof jrland.world.v1.InventorySlot
                 * @static
                 * @param {jrland.world.v1.IInventorySlot} message InventorySlot message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InventorySlot.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.itemId != null && Object.hasOwnProperty.call(message, "itemId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.itemId);
                    if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                        writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.count);
                    if (message.hotbarIndex != null && Object.hasOwnProperty.call(message, "hotbarIndex"))
                        writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.hotbarIndex);
                    if (message.blockType != null && Object.hasOwnProperty.call(message, "blockType"))
                        writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.blockType);
                    return writer;
                };

                /**
                 * Encodes the specified InventorySlot message, length delimited. Does not implicitly {@link jrland.world.v1.InventorySlot.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof jrland.world.v1.InventorySlot
                 * @static
                 * @param {jrland.world.v1.IInventorySlot} message InventorySlot message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InventorySlot.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an InventorySlot message from the specified reader or buffer.
                 * @function decode
                 * @memberof jrland.world.v1.InventorySlot
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jrland.world.v1.InventorySlot} InventorySlot
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                InventorySlot.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.jrland.world.v1.InventorySlot();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.itemId = reader.string();
                                break;
                            }
                        case 2: {
                                message.count = reader.uint32();
                                break;
                            }
                        case 3: {
                                message.hotbarIndex = reader.uint32();
                                break;
                            }
                        case 4: {
                                message.blockType = reader.uint32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an InventorySlot message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof jrland.world.v1.InventorySlot
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {jrland.world.v1.InventorySlot} InventorySlot
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                InventorySlot.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an InventorySlot message.
                 * @function verify
                 * @memberof jrland.world.v1.InventorySlot
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                InventorySlot.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.itemId != null && message.hasOwnProperty("itemId"))
                        if (!$util.isString(message.itemId))
                            return "itemId: string expected";
                    if (message.count != null && message.hasOwnProperty("count"))
                        if (!$util.isInteger(message.count))
                            return "count: integer expected";
                    if (message.hotbarIndex != null && message.hasOwnProperty("hotbarIndex"))
                        if (!$util.isInteger(message.hotbarIndex))
                            return "hotbarIndex: integer expected";
                    if (message.blockType != null && message.hasOwnProperty("blockType"))
                        if (!$util.isInteger(message.blockType))
                            return "blockType: integer expected";
                    return null;
                };

                /**
                 * Creates an InventorySlot message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof jrland.world.v1.InventorySlot
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {jrland.world.v1.InventorySlot} InventorySlot
                 */
                InventorySlot.fromObject = function fromObject(object) {
                    if (object instanceof $root.jrland.world.v1.InventorySlot)
                        return object;
                    let message = new $root.jrland.world.v1.InventorySlot();
                    if (object.itemId != null)
                        message.itemId = String(object.itemId);
                    if (object.count != null)
                        message.count = object.count >>> 0;
                    if (object.hotbarIndex != null)
                        message.hotbarIndex = object.hotbarIndex >>> 0;
                    if (object.blockType != null)
                        message.blockType = object.blockType >>> 0;
                    return message;
                };

                /**
                 * Creates a plain object from an InventorySlot message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof jrland.world.v1.InventorySlot
                 * @static
                 * @param {jrland.world.v1.InventorySlot} message InventorySlot
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                InventorySlot.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.itemId = "";
                        object.count = 0;
                        object.hotbarIndex = 0;
                        object.blockType = 0;
                    }
                    if (message.itemId != null && message.hasOwnProperty("itemId"))
                        object.itemId = message.itemId;
                    if (message.count != null && message.hasOwnProperty("count"))
                        object.count = message.count;
                    if (message.hotbarIndex != null && message.hasOwnProperty("hotbarIndex"))
                        object.hotbarIndex = message.hotbarIndex;
                    if (message.blockType != null && message.hasOwnProperty("blockType"))
                        object.blockType = message.blockType;
                    return object;
                };

                /**
                 * Converts this InventorySlot to JSON.
                 * @function toJSON
                 * @memberof jrland.world.v1.InventorySlot
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                InventorySlot.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for InventorySlot
                 * @function getTypeUrl
                 * @memberof jrland.world.v1.InventorySlot
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                InventorySlot.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/jrland.world.v1.InventorySlot";
                };

                return InventorySlot;
            })();

            v1.ChunkCoord = (function() {

                /**
                 * Properties of a ChunkCoord.
                 * @memberof jrland.world.v1
                 * @interface IChunkCoord
                 * @property {number|null} [x] ChunkCoord x
                 * @property {number|null} [z] ChunkCoord z
                 */

                /**
                 * Constructs a new ChunkCoord.
                 * @memberof jrland.world.v1
                 * @classdesc Represents a ChunkCoord.
                 * @implements IChunkCoord
                 * @constructor
                 * @param {jrland.world.v1.IChunkCoord=} [properties] Properties to set
                 */
                function ChunkCoord(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ChunkCoord x.
                 * @member {number} x
                 * @memberof jrland.world.v1.ChunkCoord
                 * @instance
                 */
                ChunkCoord.prototype.x = 0;

                /**
                 * ChunkCoord z.
                 * @member {number} z
                 * @memberof jrland.world.v1.ChunkCoord
                 * @instance
                 */
                ChunkCoord.prototype.z = 0;

                /**
                 * Creates a new ChunkCoord instance using the specified properties.
                 * @function create
                 * @memberof jrland.world.v1.ChunkCoord
                 * @static
                 * @param {jrland.world.v1.IChunkCoord=} [properties] Properties to set
                 * @returns {jrland.world.v1.ChunkCoord} ChunkCoord instance
                 */
                ChunkCoord.create = function create(properties) {
                    return new ChunkCoord(properties);
                };

                /**
                 * Encodes the specified ChunkCoord message. Does not implicitly {@link jrland.world.v1.ChunkCoord.verify|verify} messages.
                 * @function encode
                 * @memberof jrland.world.v1.ChunkCoord
                 * @static
                 * @param {jrland.world.v1.IChunkCoord} message ChunkCoord message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ChunkCoord.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.x);
                    if (message.z != null && Object.hasOwnProperty.call(message, "z"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.z);
                    return writer;
                };

                /**
                 * Encodes the specified ChunkCoord message, length delimited. Does not implicitly {@link jrland.world.v1.ChunkCoord.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof jrland.world.v1.ChunkCoord
                 * @static
                 * @param {jrland.world.v1.IChunkCoord} message ChunkCoord message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ChunkCoord.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ChunkCoord message from the specified reader or buffer.
                 * @function decode
                 * @memberof jrland.world.v1.ChunkCoord
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jrland.world.v1.ChunkCoord} ChunkCoord
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ChunkCoord.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.jrland.world.v1.ChunkCoord();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.x = reader.int32();
                                break;
                            }
                        case 2: {
                                message.z = reader.int32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ChunkCoord message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof jrland.world.v1.ChunkCoord
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {jrland.world.v1.ChunkCoord} ChunkCoord
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ChunkCoord.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ChunkCoord message.
                 * @function verify
                 * @memberof jrland.world.v1.ChunkCoord
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ChunkCoord.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.x != null && message.hasOwnProperty("x"))
                        if (!$util.isInteger(message.x))
                            return "x: integer expected";
                    if (message.z != null && message.hasOwnProperty("z"))
                        if (!$util.isInteger(message.z))
                            return "z: integer expected";
                    return null;
                };

                /**
                 * Creates a ChunkCoord message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof jrland.world.v1.ChunkCoord
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {jrland.world.v1.ChunkCoord} ChunkCoord
                 */
                ChunkCoord.fromObject = function fromObject(object) {
                    if (object instanceof $root.jrland.world.v1.ChunkCoord)
                        return object;
                    let message = new $root.jrland.world.v1.ChunkCoord();
                    if (object.x != null)
                        message.x = object.x | 0;
                    if (object.z != null)
                        message.z = object.z | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a ChunkCoord message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof jrland.world.v1.ChunkCoord
                 * @static
                 * @param {jrland.world.v1.ChunkCoord} message ChunkCoord
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ChunkCoord.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.x = 0;
                        object.z = 0;
                    }
                    if (message.x != null && message.hasOwnProperty("x"))
                        object.x = message.x;
                    if (message.z != null && message.hasOwnProperty("z"))
                        object.z = message.z;
                    return object;
                };

                /**
                 * Converts this ChunkCoord to JSON.
                 * @function toJSON
                 * @memberof jrland.world.v1.ChunkCoord
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ChunkCoord.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ChunkCoord
                 * @function getTypeUrl
                 * @memberof jrland.world.v1.ChunkCoord
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ChunkCoord.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/jrland.world.v1.ChunkCoord";
                };

                return ChunkCoord;
            })();

            v1.EntitySnapshot = (function() {

                /**
                 * Properties of an EntitySnapshot.
                 * @memberof jrland.world.v1
                 * @interface IEntitySnapshot
                 * @property {string|null} [entityId] EntitySnapshot entityId
                 * @property {jrland.world.v1.EntityKind|null} [kind] EntitySnapshot kind
                 * @property {string|null} [name] EntitySnapshot name
                 * @property {jrland.world.v1.IVector3|null} [position] EntitySnapshot position
                 * @property {jrland.world.v1.IVector3|null} [velocity] EntitySnapshot velocity
                 * @property {number|null} [yaw] EntitySnapshot yaw
                 * @property {number|null} [health] EntitySnapshot health
                 */

                /**
                 * Constructs a new EntitySnapshot.
                 * @memberof jrland.world.v1
                 * @classdesc Represents an EntitySnapshot.
                 * @implements IEntitySnapshot
                 * @constructor
                 * @param {jrland.world.v1.IEntitySnapshot=} [properties] Properties to set
                 */
                function EntitySnapshot(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * EntitySnapshot entityId.
                 * @member {string} entityId
                 * @memberof jrland.world.v1.EntitySnapshot
                 * @instance
                 */
                EntitySnapshot.prototype.entityId = "";

                /**
                 * EntitySnapshot kind.
                 * @member {jrland.world.v1.EntityKind} kind
                 * @memberof jrland.world.v1.EntitySnapshot
                 * @instance
                 */
                EntitySnapshot.prototype.kind = 0;

                /**
                 * EntitySnapshot name.
                 * @member {string} name
                 * @memberof jrland.world.v1.EntitySnapshot
                 * @instance
                 */
                EntitySnapshot.prototype.name = "";

                /**
                 * EntitySnapshot position.
                 * @member {jrland.world.v1.IVector3|null|undefined} position
                 * @memberof jrland.world.v1.EntitySnapshot
                 * @instance
                 */
                EntitySnapshot.prototype.position = null;

                /**
                 * EntitySnapshot velocity.
                 * @member {jrland.world.v1.IVector3|null|undefined} velocity
                 * @memberof jrland.world.v1.EntitySnapshot
                 * @instance
                 */
                EntitySnapshot.prototype.velocity = null;

                /**
                 * EntitySnapshot yaw.
                 * @member {number} yaw
                 * @memberof jrland.world.v1.EntitySnapshot
                 * @instance
                 */
                EntitySnapshot.prototype.yaw = 0;

                /**
                 * EntitySnapshot health.
                 * @member {number} health
                 * @memberof jrland.world.v1.EntitySnapshot
                 * @instance
                 */
                EntitySnapshot.prototype.health = 0;

                /**
                 * Creates a new EntitySnapshot instance using the specified properties.
                 * @function create
                 * @memberof jrland.world.v1.EntitySnapshot
                 * @static
                 * @param {jrland.world.v1.IEntitySnapshot=} [properties] Properties to set
                 * @returns {jrland.world.v1.EntitySnapshot} EntitySnapshot instance
                 */
                EntitySnapshot.create = function create(properties) {
                    return new EntitySnapshot(properties);
                };

                /**
                 * Encodes the specified EntitySnapshot message. Does not implicitly {@link jrland.world.v1.EntitySnapshot.verify|verify} messages.
                 * @function encode
                 * @memberof jrland.world.v1.EntitySnapshot
                 * @static
                 * @param {jrland.world.v1.IEntitySnapshot} message EntitySnapshot message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                EntitySnapshot.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.entityId != null && Object.hasOwnProperty.call(message, "entityId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.entityId);
                    if (message.kind != null && Object.hasOwnProperty.call(message, "kind"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.kind);
                    if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
                    if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                        $root.jrland.world.v1.Vector3.encode(message.position, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    if (message.velocity != null && Object.hasOwnProperty.call(message, "velocity"))
                        $root.jrland.world.v1.Vector3.encode(message.velocity, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                    if (message.yaw != null && Object.hasOwnProperty.call(message, "yaw"))
                        writer.uint32(/* id 6, wireType 5 =*/53).float(message.yaw);
                    if (message.health != null && Object.hasOwnProperty.call(message, "health"))
                        writer.uint32(/* id 7, wireType 5 =*/61).float(message.health);
                    return writer;
                };

                /**
                 * Encodes the specified EntitySnapshot message, length delimited. Does not implicitly {@link jrland.world.v1.EntitySnapshot.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof jrland.world.v1.EntitySnapshot
                 * @static
                 * @param {jrland.world.v1.IEntitySnapshot} message EntitySnapshot message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                EntitySnapshot.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an EntitySnapshot message from the specified reader or buffer.
                 * @function decode
                 * @memberof jrland.world.v1.EntitySnapshot
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jrland.world.v1.EntitySnapshot} EntitySnapshot
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                EntitySnapshot.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.jrland.world.v1.EntitySnapshot();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.entityId = reader.string();
                                break;
                            }
                        case 2: {
                                message.kind = reader.int32();
                                break;
                            }
                        case 3: {
                                message.name = reader.string();
                                break;
                            }
                        case 4: {
                                message.position = $root.jrland.world.v1.Vector3.decode(reader, reader.uint32());
                                break;
                            }
                        case 5: {
                                message.velocity = $root.jrland.world.v1.Vector3.decode(reader, reader.uint32());
                                break;
                            }
                        case 6: {
                                message.yaw = reader.float();
                                break;
                            }
                        case 7: {
                                message.health = reader.float();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an EntitySnapshot message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof jrland.world.v1.EntitySnapshot
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {jrland.world.v1.EntitySnapshot} EntitySnapshot
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                EntitySnapshot.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an EntitySnapshot message.
                 * @function verify
                 * @memberof jrland.world.v1.EntitySnapshot
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                EntitySnapshot.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.entityId != null && message.hasOwnProperty("entityId"))
                        if (!$util.isString(message.entityId))
                            return "entityId: string expected";
                    if (message.kind != null && message.hasOwnProperty("kind"))
                        switch (message.kind) {
                        default:
                            return "kind: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                            break;
                        }
                    if (message.name != null && message.hasOwnProperty("name"))
                        if (!$util.isString(message.name))
                            return "name: string expected";
                    if (message.position != null && message.hasOwnProperty("position")) {
                        let error = $root.jrland.world.v1.Vector3.verify(message.position);
                        if (error)
                            return "position." + error;
                    }
                    if (message.velocity != null && message.hasOwnProperty("velocity")) {
                        let error = $root.jrland.world.v1.Vector3.verify(message.velocity);
                        if (error)
                            return "velocity." + error;
                    }
                    if (message.yaw != null && message.hasOwnProperty("yaw"))
                        if (typeof message.yaw !== "number")
                            return "yaw: number expected";
                    if (message.health != null && message.hasOwnProperty("health"))
                        if (typeof message.health !== "number")
                            return "health: number expected";
                    return null;
                };

                /**
                 * Creates an EntitySnapshot message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof jrland.world.v1.EntitySnapshot
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {jrland.world.v1.EntitySnapshot} EntitySnapshot
                 */
                EntitySnapshot.fromObject = function fromObject(object) {
                    if (object instanceof $root.jrland.world.v1.EntitySnapshot)
                        return object;
                    let message = new $root.jrland.world.v1.EntitySnapshot();
                    if (object.entityId != null)
                        message.entityId = String(object.entityId);
                    switch (object.kind) {
                    default:
                        if (typeof object.kind === "number") {
                            message.kind = object.kind;
                            break;
                        }
                        break;
                    case "ENTITY_KIND_UNKNOWN":
                    case 0:
                        message.kind = 0;
                        break;
                    case "ENTITY_KIND_PLAYER":
                    case 1:
                        message.kind = 1;
                        break;
                    case "ENTITY_KIND_TREE":
                    case 2:
                        message.kind = 2;
                        break;
                    case "ENTITY_KIND_CREATURE":
                    case 3:
                        message.kind = 3;
                        break;
                    case "ENTITY_KIND_STRUCTURE":
                    case 4:
                        message.kind = 4;
                        break;
                    }
                    if (object.name != null)
                        message.name = String(object.name);
                    if (object.position != null) {
                        if (typeof object.position !== "object")
                            throw TypeError(".jrland.world.v1.EntitySnapshot.position: object expected");
                        message.position = $root.jrland.world.v1.Vector3.fromObject(object.position);
                    }
                    if (object.velocity != null) {
                        if (typeof object.velocity !== "object")
                            throw TypeError(".jrland.world.v1.EntitySnapshot.velocity: object expected");
                        message.velocity = $root.jrland.world.v1.Vector3.fromObject(object.velocity);
                    }
                    if (object.yaw != null)
                        message.yaw = Number(object.yaw);
                    if (object.health != null)
                        message.health = Number(object.health);
                    return message;
                };

                /**
                 * Creates a plain object from an EntitySnapshot message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof jrland.world.v1.EntitySnapshot
                 * @static
                 * @param {jrland.world.v1.EntitySnapshot} message EntitySnapshot
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                EntitySnapshot.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.entityId = "";
                        object.kind = options.enums === String ? "ENTITY_KIND_UNKNOWN" : 0;
                        object.name = "";
                        object.position = null;
                        object.velocity = null;
                        object.yaw = 0;
                        object.health = 0;
                    }
                    if (message.entityId != null && message.hasOwnProperty("entityId"))
                        object.entityId = message.entityId;
                    if (message.kind != null && message.hasOwnProperty("kind"))
                        object.kind = options.enums === String ? $root.jrland.world.v1.EntityKind[message.kind] === undefined ? message.kind : $root.jrland.world.v1.EntityKind[message.kind] : message.kind;
                    if (message.name != null && message.hasOwnProperty("name"))
                        object.name = message.name;
                    if (message.position != null && message.hasOwnProperty("position"))
                        object.position = $root.jrland.world.v1.Vector3.toObject(message.position, options);
                    if (message.velocity != null && message.hasOwnProperty("velocity"))
                        object.velocity = $root.jrland.world.v1.Vector3.toObject(message.velocity, options);
                    if (message.yaw != null && message.hasOwnProperty("yaw"))
                        object.yaw = options.json && !isFinite(message.yaw) ? String(message.yaw) : message.yaw;
                    if (message.health != null && message.hasOwnProperty("health"))
                        object.health = options.json && !isFinite(message.health) ? String(message.health) : message.health;
                    return object;
                };

                /**
                 * Converts this EntitySnapshot to JSON.
                 * @function toJSON
                 * @memberof jrland.world.v1.EntitySnapshot
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                EntitySnapshot.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for EntitySnapshot
                 * @function getTypeUrl
                 * @memberof jrland.world.v1.EntitySnapshot
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                EntitySnapshot.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/jrland.world.v1.EntitySnapshot";
                };

                return EntitySnapshot;
            })();

            v1.EntityDelta = (function() {

                /**
                 * Properties of an EntityDelta.
                 * @memberof jrland.world.v1
                 * @interface IEntityDelta
                 * @property {string|null} [entityId] EntityDelta entityId
                 * @property {jrland.world.v1.IVector3|null} [position] EntityDelta position
                 * @property {jrland.world.v1.IVector3|null} [velocity] EntityDelta velocity
                 * @property {number|null} [yaw] EntityDelta yaw
                 * @property {number|null} [health] EntityDelta health
                 * @property {boolean|null} [removed] EntityDelta removed
                 */

                /**
                 * Constructs a new EntityDelta.
                 * @memberof jrland.world.v1
                 * @classdesc Represents an EntityDelta.
                 * @implements IEntityDelta
                 * @constructor
                 * @param {jrland.world.v1.IEntityDelta=} [properties] Properties to set
                 */
                function EntityDelta(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * EntityDelta entityId.
                 * @member {string} entityId
                 * @memberof jrland.world.v1.EntityDelta
                 * @instance
                 */
                EntityDelta.prototype.entityId = "";

                /**
                 * EntityDelta position.
                 * @member {jrland.world.v1.IVector3|null|undefined} position
                 * @memberof jrland.world.v1.EntityDelta
                 * @instance
                 */
                EntityDelta.prototype.position = null;

                /**
                 * EntityDelta velocity.
                 * @member {jrland.world.v1.IVector3|null|undefined} velocity
                 * @memberof jrland.world.v1.EntityDelta
                 * @instance
                 */
                EntityDelta.prototype.velocity = null;

                /**
                 * EntityDelta yaw.
                 * @member {number} yaw
                 * @memberof jrland.world.v1.EntityDelta
                 * @instance
                 */
                EntityDelta.prototype.yaw = 0;

                /**
                 * EntityDelta health.
                 * @member {number} health
                 * @memberof jrland.world.v1.EntityDelta
                 * @instance
                 */
                EntityDelta.prototype.health = 0;

                /**
                 * EntityDelta removed.
                 * @member {boolean} removed
                 * @memberof jrland.world.v1.EntityDelta
                 * @instance
                 */
                EntityDelta.prototype.removed = false;

                /**
                 * Creates a new EntityDelta instance using the specified properties.
                 * @function create
                 * @memberof jrland.world.v1.EntityDelta
                 * @static
                 * @param {jrland.world.v1.IEntityDelta=} [properties] Properties to set
                 * @returns {jrland.world.v1.EntityDelta} EntityDelta instance
                 */
                EntityDelta.create = function create(properties) {
                    return new EntityDelta(properties);
                };

                /**
                 * Encodes the specified EntityDelta message. Does not implicitly {@link jrland.world.v1.EntityDelta.verify|verify} messages.
                 * @function encode
                 * @memberof jrland.world.v1.EntityDelta
                 * @static
                 * @param {jrland.world.v1.IEntityDelta} message EntityDelta message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                EntityDelta.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.entityId != null && Object.hasOwnProperty.call(message, "entityId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.entityId);
                    if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                        $root.jrland.world.v1.Vector3.encode(message.position, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.velocity != null && Object.hasOwnProperty.call(message, "velocity"))
                        $root.jrland.world.v1.Vector3.encode(message.velocity, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.yaw != null && Object.hasOwnProperty.call(message, "yaw"))
                        writer.uint32(/* id 4, wireType 5 =*/37).float(message.yaw);
                    if (message.health != null && Object.hasOwnProperty.call(message, "health"))
                        writer.uint32(/* id 5, wireType 5 =*/45).float(message.health);
                    if (message.removed != null && Object.hasOwnProperty.call(message, "removed"))
                        writer.uint32(/* id 6, wireType 0 =*/48).bool(message.removed);
                    return writer;
                };

                /**
                 * Encodes the specified EntityDelta message, length delimited. Does not implicitly {@link jrland.world.v1.EntityDelta.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof jrland.world.v1.EntityDelta
                 * @static
                 * @param {jrland.world.v1.IEntityDelta} message EntityDelta message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                EntityDelta.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an EntityDelta message from the specified reader or buffer.
                 * @function decode
                 * @memberof jrland.world.v1.EntityDelta
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jrland.world.v1.EntityDelta} EntityDelta
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                EntityDelta.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.jrland.world.v1.EntityDelta();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.entityId = reader.string();
                                break;
                            }
                        case 2: {
                                message.position = $root.jrland.world.v1.Vector3.decode(reader, reader.uint32());
                                break;
                            }
                        case 3: {
                                message.velocity = $root.jrland.world.v1.Vector3.decode(reader, reader.uint32());
                                break;
                            }
                        case 4: {
                                message.yaw = reader.float();
                                break;
                            }
                        case 5: {
                                message.health = reader.float();
                                break;
                            }
                        case 6: {
                                message.removed = reader.bool();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an EntityDelta message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof jrland.world.v1.EntityDelta
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {jrland.world.v1.EntityDelta} EntityDelta
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                EntityDelta.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an EntityDelta message.
                 * @function verify
                 * @memberof jrland.world.v1.EntityDelta
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                EntityDelta.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.entityId != null && message.hasOwnProperty("entityId"))
                        if (!$util.isString(message.entityId))
                            return "entityId: string expected";
                    if (message.position != null && message.hasOwnProperty("position")) {
                        let error = $root.jrland.world.v1.Vector3.verify(message.position);
                        if (error)
                            return "position." + error;
                    }
                    if (message.velocity != null && message.hasOwnProperty("velocity")) {
                        let error = $root.jrland.world.v1.Vector3.verify(message.velocity);
                        if (error)
                            return "velocity." + error;
                    }
                    if (message.yaw != null && message.hasOwnProperty("yaw"))
                        if (typeof message.yaw !== "number")
                            return "yaw: number expected";
                    if (message.health != null && message.hasOwnProperty("health"))
                        if (typeof message.health !== "number")
                            return "health: number expected";
                    if (message.removed != null && message.hasOwnProperty("removed"))
                        if (typeof message.removed !== "boolean")
                            return "removed: boolean expected";
                    return null;
                };

                /**
                 * Creates an EntityDelta message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof jrland.world.v1.EntityDelta
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {jrland.world.v1.EntityDelta} EntityDelta
                 */
                EntityDelta.fromObject = function fromObject(object) {
                    if (object instanceof $root.jrland.world.v1.EntityDelta)
                        return object;
                    let message = new $root.jrland.world.v1.EntityDelta();
                    if (object.entityId != null)
                        message.entityId = String(object.entityId);
                    if (object.position != null) {
                        if (typeof object.position !== "object")
                            throw TypeError(".jrland.world.v1.EntityDelta.position: object expected");
                        message.position = $root.jrland.world.v1.Vector3.fromObject(object.position);
                    }
                    if (object.velocity != null) {
                        if (typeof object.velocity !== "object")
                            throw TypeError(".jrland.world.v1.EntityDelta.velocity: object expected");
                        message.velocity = $root.jrland.world.v1.Vector3.fromObject(object.velocity);
                    }
                    if (object.yaw != null)
                        message.yaw = Number(object.yaw);
                    if (object.health != null)
                        message.health = Number(object.health);
                    if (object.removed != null)
                        message.removed = Boolean(object.removed);
                    return message;
                };

                /**
                 * Creates a plain object from an EntityDelta message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof jrland.world.v1.EntityDelta
                 * @static
                 * @param {jrland.world.v1.EntityDelta} message EntityDelta
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                EntityDelta.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.entityId = "";
                        object.position = null;
                        object.velocity = null;
                        object.yaw = 0;
                        object.health = 0;
                        object.removed = false;
                    }
                    if (message.entityId != null && message.hasOwnProperty("entityId"))
                        object.entityId = message.entityId;
                    if (message.position != null && message.hasOwnProperty("position"))
                        object.position = $root.jrland.world.v1.Vector3.toObject(message.position, options);
                    if (message.velocity != null && message.hasOwnProperty("velocity"))
                        object.velocity = $root.jrland.world.v1.Vector3.toObject(message.velocity, options);
                    if (message.yaw != null && message.hasOwnProperty("yaw"))
                        object.yaw = options.json && !isFinite(message.yaw) ? String(message.yaw) : message.yaw;
                    if (message.health != null && message.hasOwnProperty("health"))
                        object.health = options.json && !isFinite(message.health) ? String(message.health) : message.health;
                    if (message.removed != null && message.hasOwnProperty("removed"))
                        object.removed = message.removed;
                    return object;
                };

                /**
                 * Converts this EntityDelta to JSON.
                 * @function toJSON
                 * @memberof jrland.world.v1.EntityDelta
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                EntityDelta.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for EntityDelta
                 * @function getTypeUrl
                 * @memberof jrland.world.v1.EntityDelta
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                EntityDelta.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/jrland.world.v1.EntityDelta";
                };

                return EntityDelta;
            })();

            v1.ChunkSnapshot = (function() {

                /**
                 * Properties of a ChunkSnapshot.
                 * @memberof jrland.world.v1
                 * @interface IChunkSnapshot
                 * @property {number|null} [chunkX] ChunkSnapshot chunkX
                 * @property {number|null} [chunkZ] ChunkSnapshot chunkZ
                 * @property {number|null} [version] ChunkSnapshot version
                 * @property {number|null} [sizeX] ChunkSnapshot sizeX
                 * @property {number|null} [sizeY] ChunkSnapshot sizeY
                 * @property {number|null} [sizeZ] ChunkSnapshot sizeZ
                 * @property {Array.<number>|null} [blocks] ChunkSnapshot blocks
                 */

                /**
                 * Constructs a new ChunkSnapshot.
                 * @memberof jrland.world.v1
                 * @classdesc Represents a ChunkSnapshot.
                 * @implements IChunkSnapshot
                 * @constructor
                 * @param {jrland.world.v1.IChunkSnapshot=} [properties] Properties to set
                 */
                function ChunkSnapshot(properties) {
                    this.blocks = [];
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ChunkSnapshot chunkX.
                 * @member {number} chunkX
                 * @memberof jrland.world.v1.ChunkSnapshot
                 * @instance
                 */
                ChunkSnapshot.prototype.chunkX = 0;

                /**
                 * ChunkSnapshot chunkZ.
                 * @member {number} chunkZ
                 * @memberof jrland.world.v1.ChunkSnapshot
                 * @instance
                 */
                ChunkSnapshot.prototype.chunkZ = 0;

                /**
                 * ChunkSnapshot version.
                 * @member {number} version
                 * @memberof jrland.world.v1.ChunkSnapshot
                 * @instance
                 */
                ChunkSnapshot.prototype.version = 0;

                /**
                 * ChunkSnapshot sizeX.
                 * @member {number} sizeX
                 * @memberof jrland.world.v1.ChunkSnapshot
                 * @instance
                 */
                ChunkSnapshot.prototype.sizeX = 0;

                /**
                 * ChunkSnapshot sizeY.
                 * @member {number} sizeY
                 * @memberof jrland.world.v1.ChunkSnapshot
                 * @instance
                 */
                ChunkSnapshot.prototype.sizeY = 0;

                /**
                 * ChunkSnapshot sizeZ.
                 * @member {number} sizeZ
                 * @memberof jrland.world.v1.ChunkSnapshot
                 * @instance
                 */
                ChunkSnapshot.prototype.sizeZ = 0;

                /**
                 * ChunkSnapshot blocks.
                 * @member {Array.<number>} blocks
                 * @memberof jrland.world.v1.ChunkSnapshot
                 * @instance
                 */
                ChunkSnapshot.prototype.blocks = $util.emptyArray;

                /**
                 * Creates a new ChunkSnapshot instance using the specified properties.
                 * @function create
                 * @memberof jrland.world.v1.ChunkSnapshot
                 * @static
                 * @param {jrland.world.v1.IChunkSnapshot=} [properties] Properties to set
                 * @returns {jrland.world.v1.ChunkSnapshot} ChunkSnapshot instance
                 */
                ChunkSnapshot.create = function create(properties) {
                    return new ChunkSnapshot(properties);
                };

                /**
                 * Encodes the specified ChunkSnapshot message. Does not implicitly {@link jrland.world.v1.ChunkSnapshot.verify|verify} messages.
                 * @function encode
                 * @memberof jrland.world.v1.ChunkSnapshot
                 * @static
                 * @param {jrland.world.v1.IChunkSnapshot} message ChunkSnapshot message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ChunkSnapshot.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.chunkX != null && Object.hasOwnProperty.call(message, "chunkX"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.chunkX);
                    if (message.chunkZ != null && Object.hasOwnProperty.call(message, "chunkZ"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.chunkZ);
                    if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                        writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.version);
                    if (message.sizeX != null && Object.hasOwnProperty.call(message, "sizeX"))
                        writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.sizeX);
                    if (message.sizeY != null && Object.hasOwnProperty.call(message, "sizeY"))
                        writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.sizeY);
                    if (message.sizeZ != null && Object.hasOwnProperty.call(message, "sizeZ"))
                        writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.sizeZ);
                    if (message.blocks != null && message.blocks.length) {
                        writer.uint32(/* id 7, wireType 2 =*/58).fork();
                        for (let i = 0; i < message.blocks.length; ++i)
                            writer.uint32(message.blocks[i]);
                        writer.ldelim();
                    }
                    return writer;
                };

                /**
                 * Encodes the specified ChunkSnapshot message, length delimited. Does not implicitly {@link jrland.world.v1.ChunkSnapshot.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof jrland.world.v1.ChunkSnapshot
                 * @static
                 * @param {jrland.world.v1.IChunkSnapshot} message ChunkSnapshot message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ChunkSnapshot.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ChunkSnapshot message from the specified reader or buffer.
                 * @function decode
                 * @memberof jrland.world.v1.ChunkSnapshot
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jrland.world.v1.ChunkSnapshot} ChunkSnapshot
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ChunkSnapshot.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.jrland.world.v1.ChunkSnapshot();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.chunkX = reader.int32();
                                break;
                            }
                        case 2: {
                                message.chunkZ = reader.int32();
                                break;
                            }
                        case 3: {
                                message.version = reader.uint32();
                                break;
                            }
                        case 4: {
                                message.sizeX = reader.uint32();
                                break;
                            }
                        case 5: {
                                message.sizeY = reader.uint32();
                                break;
                            }
                        case 6: {
                                message.sizeZ = reader.uint32();
                                break;
                            }
                        case 7: {
                                if (!(message.blocks && message.blocks.length))
                                    message.blocks = [];
                                if ((tag & 7) === 2) {
                                    let end2 = reader.uint32() + reader.pos;
                                    while (reader.pos < end2)
                                        message.blocks.push(reader.uint32());
                                } else
                                    message.blocks.push(reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ChunkSnapshot message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof jrland.world.v1.ChunkSnapshot
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {jrland.world.v1.ChunkSnapshot} ChunkSnapshot
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ChunkSnapshot.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ChunkSnapshot message.
                 * @function verify
                 * @memberof jrland.world.v1.ChunkSnapshot
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ChunkSnapshot.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.chunkX != null && message.hasOwnProperty("chunkX"))
                        if (!$util.isInteger(message.chunkX))
                            return "chunkX: integer expected";
                    if (message.chunkZ != null && message.hasOwnProperty("chunkZ"))
                        if (!$util.isInteger(message.chunkZ))
                            return "chunkZ: integer expected";
                    if (message.version != null && message.hasOwnProperty("version"))
                        if (!$util.isInteger(message.version))
                            return "version: integer expected";
                    if (message.sizeX != null && message.hasOwnProperty("sizeX"))
                        if (!$util.isInteger(message.sizeX))
                            return "sizeX: integer expected";
                    if (message.sizeY != null && message.hasOwnProperty("sizeY"))
                        if (!$util.isInteger(message.sizeY))
                            return "sizeY: integer expected";
                    if (message.sizeZ != null && message.hasOwnProperty("sizeZ"))
                        if (!$util.isInteger(message.sizeZ))
                            return "sizeZ: integer expected";
                    if (message.blocks != null && message.hasOwnProperty("blocks")) {
                        if (!Array.isArray(message.blocks))
                            return "blocks: array expected";
                        for (let i = 0; i < message.blocks.length; ++i)
                            if (!$util.isInteger(message.blocks[i]))
                                return "blocks: integer[] expected";
                    }
                    return null;
                };

                /**
                 * Creates a ChunkSnapshot message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof jrland.world.v1.ChunkSnapshot
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {jrland.world.v1.ChunkSnapshot} ChunkSnapshot
                 */
                ChunkSnapshot.fromObject = function fromObject(object) {
                    if (object instanceof $root.jrland.world.v1.ChunkSnapshot)
                        return object;
                    let message = new $root.jrland.world.v1.ChunkSnapshot();
                    if (object.chunkX != null)
                        message.chunkX = object.chunkX | 0;
                    if (object.chunkZ != null)
                        message.chunkZ = object.chunkZ | 0;
                    if (object.version != null)
                        message.version = object.version >>> 0;
                    if (object.sizeX != null)
                        message.sizeX = object.sizeX >>> 0;
                    if (object.sizeY != null)
                        message.sizeY = object.sizeY >>> 0;
                    if (object.sizeZ != null)
                        message.sizeZ = object.sizeZ >>> 0;
                    if (object.blocks) {
                        if (!Array.isArray(object.blocks))
                            throw TypeError(".jrland.world.v1.ChunkSnapshot.blocks: array expected");
                        message.blocks = [];
                        for (let i = 0; i < object.blocks.length; ++i)
                            message.blocks[i] = object.blocks[i] >>> 0;
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a ChunkSnapshot message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof jrland.world.v1.ChunkSnapshot
                 * @static
                 * @param {jrland.world.v1.ChunkSnapshot} message ChunkSnapshot
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ChunkSnapshot.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.arrays || options.defaults)
                        object.blocks = [];
                    if (options.defaults) {
                        object.chunkX = 0;
                        object.chunkZ = 0;
                        object.version = 0;
                        object.sizeX = 0;
                        object.sizeY = 0;
                        object.sizeZ = 0;
                    }
                    if (message.chunkX != null && message.hasOwnProperty("chunkX"))
                        object.chunkX = message.chunkX;
                    if (message.chunkZ != null && message.hasOwnProperty("chunkZ"))
                        object.chunkZ = message.chunkZ;
                    if (message.version != null && message.hasOwnProperty("version"))
                        object.version = message.version;
                    if (message.sizeX != null && message.hasOwnProperty("sizeX"))
                        object.sizeX = message.sizeX;
                    if (message.sizeY != null && message.hasOwnProperty("sizeY"))
                        object.sizeY = message.sizeY;
                    if (message.sizeZ != null && message.hasOwnProperty("sizeZ"))
                        object.sizeZ = message.sizeZ;
                    if (message.blocks && message.blocks.length) {
                        object.blocks = [];
                        for (let j = 0; j < message.blocks.length; ++j)
                            object.blocks[j] = message.blocks[j];
                    }
                    return object;
                };

                /**
                 * Converts this ChunkSnapshot to JSON.
                 * @function toJSON
                 * @memberof jrland.world.v1.ChunkSnapshot
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ChunkSnapshot.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ChunkSnapshot
                 * @function getTypeUrl
                 * @memberof jrland.world.v1.ChunkSnapshot
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ChunkSnapshot.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/jrland.world.v1.ChunkSnapshot";
                };

                return ChunkSnapshot;
            })();

            v1.ChunkChange = (function() {

                /**
                 * Properties of a ChunkChange.
                 * @memberof jrland.world.v1
                 * @interface IChunkChange
                 * @property {number|null} [index] ChunkChange index
                 * @property {number|null} [blockType] ChunkChange blockType
                 */

                /**
                 * Constructs a new ChunkChange.
                 * @memberof jrland.world.v1
                 * @classdesc Represents a ChunkChange.
                 * @implements IChunkChange
                 * @constructor
                 * @param {jrland.world.v1.IChunkChange=} [properties] Properties to set
                 */
                function ChunkChange(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ChunkChange index.
                 * @member {number} index
                 * @memberof jrland.world.v1.ChunkChange
                 * @instance
                 */
                ChunkChange.prototype.index = 0;

                /**
                 * ChunkChange blockType.
                 * @member {number} blockType
                 * @memberof jrland.world.v1.ChunkChange
                 * @instance
                 */
                ChunkChange.prototype.blockType = 0;

                /**
                 * Creates a new ChunkChange instance using the specified properties.
                 * @function create
                 * @memberof jrland.world.v1.ChunkChange
                 * @static
                 * @param {jrland.world.v1.IChunkChange=} [properties] Properties to set
                 * @returns {jrland.world.v1.ChunkChange} ChunkChange instance
                 */
                ChunkChange.create = function create(properties) {
                    return new ChunkChange(properties);
                };

                /**
                 * Encodes the specified ChunkChange message. Does not implicitly {@link jrland.world.v1.ChunkChange.verify|verify} messages.
                 * @function encode
                 * @memberof jrland.world.v1.ChunkChange
                 * @static
                 * @param {jrland.world.v1.IChunkChange} message ChunkChange message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ChunkChange.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.index);
                    if (message.blockType != null && Object.hasOwnProperty.call(message, "blockType"))
                        writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.blockType);
                    return writer;
                };

                /**
                 * Encodes the specified ChunkChange message, length delimited. Does not implicitly {@link jrland.world.v1.ChunkChange.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof jrland.world.v1.ChunkChange
                 * @static
                 * @param {jrland.world.v1.IChunkChange} message ChunkChange message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ChunkChange.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ChunkChange message from the specified reader or buffer.
                 * @function decode
                 * @memberof jrland.world.v1.ChunkChange
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jrland.world.v1.ChunkChange} ChunkChange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ChunkChange.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.jrland.world.v1.ChunkChange();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.index = reader.uint32();
                                break;
                            }
                        case 2: {
                                message.blockType = reader.uint32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ChunkChange message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof jrland.world.v1.ChunkChange
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {jrland.world.v1.ChunkChange} ChunkChange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ChunkChange.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ChunkChange message.
                 * @function verify
                 * @memberof jrland.world.v1.ChunkChange
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ChunkChange.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.index != null && message.hasOwnProperty("index"))
                        if (!$util.isInteger(message.index))
                            return "index: integer expected";
                    if (message.blockType != null && message.hasOwnProperty("blockType"))
                        if (!$util.isInteger(message.blockType))
                            return "blockType: integer expected";
                    return null;
                };

                /**
                 * Creates a ChunkChange message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof jrland.world.v1.ChunkChange
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {jrland.world.v1.ChunkChange} ChunkChange
                 */
                ChunkChange.fromObject = function fromObject(object) {
                    if (object instanceof $root.jrland.world.v1.ChunkChange)
                        return object;
                    let message = new $root.jrland.world.v1.ChunkChange();
                    if (object.index != null)
                        message.index = object.index >>> 0;
                    if (object.blockType != null)
                        message.blockType = object.blockType >>> 0;
                    return message;
                };

                /**
                 * Creates a plain object from a ChunkChange message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof jrland.world.v1.ChunkChange
                 * @static
                 * @param {jrland.world.v1.ChunkChange} message ChunkChange
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ChunkChange.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.index = 0;
                        object.blockType = 0;
                    }
                    if (message.index != null && message.hasOwnProperty("index"))
                        object.index = message.index;
                    if (message.blockType != null && message.hasOwnProperty("blockType"))
                        object.blockType = message.blockType;
                    return object;
                };

                /**
                 * Converts this ChunkChange to JSON.
                 * @function toJSON
                 * @memberof jrland.world.v1.ChunkChange
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ChunkChange.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ChunkChange
                 * @function getTypeUrl
                 * @memberof jrland.world.v1.ChunkChange
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ChunkChange.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/jrland.world.v1.ChunkChange";
                };

                return ChunkChange;
            })();

            v1.ChunkDelta = (function() {

                /**
                 * Properties of a ChunkDelta.
                 * @memberof jrland.world.v1
                 * @interface IChunkDelta
                 * @property {number|null} [chunkX] ChunkDelta chunkX
                 * @property {number|null} [chunkZ] ChunkDelta chunkZ
                 * @property {number|null} [version] ChunkDelta version
                 * @property {Array.<jrland.world.v1.IChunkChange>|null} [changes] ChunkDelta changes
                 */

                /**
                 * Constructs a new ChunkDelta.
                 * @memberof jrland.world.v1
                 * @classdesc Represents a ChunkDelta.
                 * @implements IChunkDelta
                 * @constructor
                 * @param {jrland.world.v1.IChunkDelta=} [properties] Properties to set
                 */
                function ChunkDelta(properties) {
                    this.changes = [];
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ChunkDelta chunkX.
                 * @member {number} chunkX
                 * @memberof jrland.world.v1.ChunkDelta
                 * @instance
                 */
                ChunkDelta.prototype.chunkX = 0;

                /**
                 * ChunkDelta chunkZ.
                 * @member {number} chunkZ
                 * @memberof jrland.world.v1.ChunkDelta
                 * @instance
                 */
                ChunkDelta.prototype.chunkZ = 0;

                /**
                 * ChunkDelta version.
                 * @member {number} version
                 * @memberof jrland.world.v1.ChunkDelta
                 * @instance
                 */
                ChunkDelta.prototype.version = 0;

                /**
                 * ChunkDelta changes.
                 * @member {Array.<jrland.world.v1.IChunkChange>} changes
                 * @memberof jrland.world.v1.ChunkDelta
                 * @instance
                 */
                ChunkDelta.prototype.changes = $util.emptyArray;

                /**
                 * Creates a new ChunkDelta instance using the specified properties.
                 * @function create
                 * @memberof jrland.world.v1.ChunkDelta
                 * @static
                 * @param {jrland.world.v1.IChunkDelta=} [properties] Properties to set
                 * @returns {jrland.world.v1.ChunkDelta} ChunkDelta instance
                 */
                ChunkDelta.create = function create(properties) {
                    return new ChunkDelta(properties);
                };

                /**
                 * Encodes the specified ChunkDelta message. Does not implicitly {@link jrland.world.v1.ChunkDelta.verify|verify} messages.
                 * @function encode
                 * @memberof jrland.world.v1.ChunkDelta
                 * @static
                 * @param {jrland.world.v1.IChunkDelta} message ChunkDelta message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ChunkDelta.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.chunkX != null && Object.hasOwnProperty.call(message, "chunkX"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.chunkX);
                    if (message.chunkZ != null && Object.hasOwnProperty.call(message, "chunkZ"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.chunkZ);
                    if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                        writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.version);
                    if (message.changes != null && message.changes.length)
                        for (let i = 0; i < message.changes.length; ++i)
                            $root.jrland.world.v1.ChunkChange.encode(message.changes[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified ChunkDelta message, length delimited. Does not implicitly {@link jrland.world.v1.ChunkDelta.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof jrland.world.v1.ChunkDelta
                 * @static
                 * @param {jrland.world.v1.IChunkDelta} message ChunkDelta message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ChunkDelta.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ChunkDelta message from the specified reader or buffer.
                 * @function decode
                 * @memberof jrland.world.v1.ChunkDelta
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jrland.world.v1.ChunkDelta} ChunkDelta
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ChunkDelta.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.jrland.world.v1.ChunkDelta();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.chunkX = reader.int32();
                                break;
                            }
                        case 2: {
                                message.chunkZ = reader.int32();
                                break;
                            }
                        case 3: {
                                message.version = reader.uint32();
                                break;
                            }
                        case 4: {
                                if (!(message.changes && message.changes.length))
                                    message.changes = [];
                                message.changes.push($root.jrland.world.v1.ChunkChange.decode(reader, reader.uint32()));
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ChunkDelta message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof jrland.world.v1.ChunkDelta
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {jrland.world.v1.ChunkDelta} ChunkDelta
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ChunkDelta.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ChunkDelta message.
                 * @function verify
                 * @memberof jrland.world.v1.ChunkDelta
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ChunkDelta.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.chunkX != null && message.hasOwnProperty("chunkX"))
                        if (!$util.isInteger(message.chunkX))
                            return "chunkX: integer expected";
                    if (message.chunkZ != null && message.hasOwnProperty("chunkZ"))
                        if (!$util.isInteger(message.chunkZ))
                            return "chunkZ: integer expected";
                    if (message.version != null && message.hasOwnProperty("version"))
                        if (!$util.isInteger(message.version))
                            return "version: integer expected";
                    if (message.changes != null && message.hasOwnProperty("changes")) {
                        if (!Array.isArray(message.changes))
                            return "changes: array expected";
                        for (let i = 0; i < message.changes.length; ++i) {
                            let error = $root.jrland.world.v1.ChunkChange.verify(message.changes[i]);
                            if (error)
                                return "changes." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a ChunkDelta message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof jrland.world.v1.ChunkDelta
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {jrland.world.v1.ChunkDelta} ChunkDelta
                 */
                ChunkDelta.fromObject = function fromObject(object) {
                    if (object instanceof $root.jrland.world.v1.ChunkDelta)
                        return object;
                    let message = new $root.jrland.world.v1.ChunkDelta();
                    if (object.chunkX != null)
                        message.chunkX = object.chunkX | 0;
                    if (object.chunkZ != null)
                        message.chunkZ = object.chunkZ | 0;
                    if (object.version != null)
                        message.version = object.version >>> 0;
                    if (object.changes) {
                        if (!Array.isArray(object.changes))
                            throw TypeError(".jrland.world.v1.ChunkDelta.changes: array expected");
                        message.changes = [];
                        for (let i = 0; i < object.changes.length; ++i) {
                            if (typeof object.changes[i] !== "object")
                                throw TypeError(".jrland.world.v1.ChunkDelta.changes: object expected");
                            message.changes[i] = $root.jrland.world.v1.ChunkChange.fromObject(object.changes[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a ChunkDelta message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof jrland.world.v1.ChunkDelta
                 * @static
                 * @param {jrland.world.v1.ChunkDelta} message ChunkDelta
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ChunkDelta.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.arrays || options.defaults)
                        object.changes = [];
                    if (options.defaults) {
                        object.chunkX = 0;
                        object.chunkZ = 0;
                        object.version = 0;
                    }
                    if (message.chunkX != null && message.hasOwnProperty("chunkX"))
                        object.chunkX = message.chunkX;
                    if (message.chunkZ != null && message.hasOwnProperty("chunkZ"))
                        object.chunkZ = message.chunkZ;
                    if (message.version != null && message.hasOwnProperty("version"))
                        object.version = message.version;
                    if (message.changes && message.changes.length) {
                        object.changes = [];
                        for (let j = 0; j < message.changes.length; ++j)
                            object.changes[j] = $root.jrland.world.v1.ChunkChange.toObject(message.changes[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this ChunkDelta to JSON.
                 * @function toJSON
                 * @memberof jrland.world.v1.ChunkDelta
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ChunkDelta.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ChunkDelta
                 * @function getTypeUrl
                 * @memberof jrland.world.v1.ChunkDelta
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ChunkDelta.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/jrland.world.v1.ChunkDelta";
                };

                return ChunkDelta;
            })();

            v1.ChatMessage = (function() {

                /**
                 * Properties of a ChatMessage.
                 * @memberof jrland.world.v1
                 * @interface IChatMessage
                 * @property {jrland.world.v1.ChatScope|null} [scope] ChatMessage scope
                 * @property {string|null} [authorId] ChatMessage authorId
                 * @property {string|null} [authorName] ChatMessage authorName
                 * @property {string|null} [text] ChatMessage text
                 * @property {number|Long|null} [timeMs] ChatMessage timeMs
                 */

                /**
                 * Constructs a new ChatMessage.
                 * @memberof jrland.world.v1
                 * @classdesc Represents a ChatMessage.
                 * @implements IChatMessage
                 * @constructor
                 * @param {jrland.world.v1.IChatMessage=} [properties] Properties to set
                 */
                function ChatMessage(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ChatMessage scope.
                 * @member {jrland.world.v1.ChatScope} scope
                 * @memberof jrland.world.v1.ChatMessage
                 * @instance
                 */
                ChatMessage.prototype.scope = 0;

                /**
                 * ChatMessage authorId.
                 * @member {string} authorId
                 * @memberof jrland.world.v1.ChatMessage
                 * @instance
                 */
                ChatMessage.prototype.authorId = "";

                /**
                 * ChatMessage authorName.
                 * @member {string} authorName
                 * @memberof jrland.world.v1.ChatMessage
                 * @instance
                 */
                ChatMessage.prototype.authorName = "";

                /**
                 * ChatMessage text.
                 * @member {string} text
                 * @memberof jrland.world.v1.ChatMessage
                 * @instance
                 */
                ChatMessage.prototype.text = "";

                /**
                 * ChatMessage timeMs.
                 * @member {number|Long} timeMs
                 * @memberof jrland.world.v1.ChatMessage
                 * @instance
                 */
                ChatMessage.prototype.timeMs = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * Creates a new ChatMessage instance using the specified properties.
                 * @function create
                 * @memberof jrland.world.v1.ChatMessage
                 * @static
                 * @param {jrland.world.v1.IChatMessage=} [properties] Properties to set
                 * @returns {jrland.world.v1.ChatMessage} ChatMessage instance
                 */
                ChatMessage.create = function create(properties) {
                    return new ChatMessage(properties);
                };

                /**
                 * Encodes the specified ChatMessage message. Does not implicitly {@link jrland.world.v1.ChatMessage.verify|verify} messages.
                 * @function encode
                 * @memberof jrland.world.v1.ChatMessage
                 * @static
                 * @param {jrland.world.v1.IChatMessage} message ChatMessage message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ChatMessage.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.scope != null && Object.hasOwnProperty.call(message, "scope"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.scope);
                    if (message.authorId != null && Object.hasOwnProperty.call(message, "authorId"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.authorId);
                    if (message.authorName != null && Object.hasOwnProperty.call(message, "authorName"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.authorName);
                    if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.text);
                    if (message.timeMs != null && Object.hasOwnProperty.call(message, "timeMs"))
                        writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.timeMs);
                    return writer;
                };

                /**
                 * Encodes the specified ChatMessage message, length delimited. Does not implicitly {@link jrland.world.v1.ChatMessage.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof jrland.world.v1.ChatMessage
                 * @static
                 * @param {jrland.world.v1.IChatMessage} message ChatMessage message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ChatMessage.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ChatMessage message from the specified reader or buffer.
                 * @function decode
                 * @memberof jrland.world.v1.ChatMessage
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jrland.world.v1.ChatMessage} ChatMessage
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ChatMessage.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.jrland.world.v1.ChatMessage();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.scope = reader.int32();
                                break;
                            }
                        case 2: {
                                message.authorId = reader.string();
                                break;
                            }
                        case 3: {
                                message.authorName = reader.string();
                                break;
                            }
                        case 4: {
                                message.text = reader.string();
                                break;
                            }
                        case 5: {
                                message.timeMs = reader.uint64();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ChatMessage message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof jrland.world.v1.ChatMessage
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {jrland.world.v1.ChatMessage} ChatMessage
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ChatMessage.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ChatMessage message.
                 * @function verify
                 * @memberof jrland.world.v1.ChatMessage
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ChatMessage.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.scope != null && message.hasOwnProperty("scope"))
                        switch (message.scope) {
                        default:
                            return "scope: enum value expected";
                        case 0:
                        case 1:
                            break;
                        }
                    if (message.authorId != null && message.hasOwnProperty("authorId"))
                        if (!$util.isString(message.authorId))
                            return "authorId: string expected";
                    if (message.authorName != null && message.hasOwnProperty("authorName"))
                        if (!$util.isString(message.authorName))
                            return "authorName: string expected";
                    if (message.text != null && message.hasOwnProperty("text"))
                        if (!$util.isString(message.text))
                            return "text: string expected";
                    if (message.timeMs != null && message.hasOwnProperty("timeMs"))
                        if (!$util.isInteger(message.timeMs) && !(message.timeMs && $util.isInteger(message.timeMs.low) && $util.isInteger(message.timeMs.high)))
                            return "timeMs: integer|Long expected";
                    return null;
                };

                /**
                 * Creates a ChatMessage message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof jrland.world.v1.ChatMessage
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {jrland.world.v1.ChatMessage} ChatMessage
                 */
                ChatMessage.fromObject = function fromObject(object) {
                    if (object instanceof $root.jrland.world.v1.ChatMessage)
                        return object;
                    let message = new $root.jrland.world.v1.ChatMessage();
                    switch (object.scope) {
                    default:
                        if (typeof object.scope === "number") {
                            message.scope = object.scope;
                            break;
                        }
                        break;
                    case "CHAT_SCOPE_LOCAL":
                    case 0:
                        message.scope = 0;
                        break;
                    case "CHAT_SCOPE_GLOBAL":
                    case 1:
                        message.scope = 1;
                        break;
                    }
                    if (object.authorId != null)
                        message.authorId = String(object.authorId);
                    if (object.authorName != null)
                        message.authorName = String(object.authorName);
                    if (object.text != null)
                        message.text = String(object.text);
                    if (object.timeMs != null)
                        if ($util.Long)
                            (message.timeMs = $util.Long.fromValue(object.timeMs)).unsigned = true;
                        else if (typeof object.timeMs === "string")
                            message.timeMs = parseInt(object.timeMs, 10);
                        else if (typeof object.timeMs === "number")
                            message.timeMs = object.timeMs;
                        else if (typeof object.timeMs === "object")
                            message.timeMs = new $util.LongBits(object.timeMs.low >>> 0, object.timeMs.high >>> 0).toNumber(true);
                    return message;
                };

                /**
                 * Creates a plain object from a ChatMessage message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof jrland.world.v1.ChatMessage
                 * @static
                 * @param {jrland.world.v1.ChatMessage} message ChatMessage
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ChatMessage.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.scope = options.enums === String ? "CHAT_SCOPE_LOCAL" : 0;
                        object.authorId = "";
                        object.authorName = "";
                        object.text = "";
                        if ($util.Long) {
                            let long = new $util.Long(0, 0, true);
                            object.timeMs = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.timeMs = options.longs === String ? "0" : 0;
                    }
                    if (message.scope != null && message.hasOwnProperty("scope"))
                        object.scope = options.enums === String ? $root.jrland.world.v1.ChatScope[message.scope] === undefined ? message.scope : $root.jrland.world.v1.ChatScope[message.scope] : message.scope;
                    if (message.authorId != null && message.hasOwnProperty("authorId"))
                        object.authorId = message.authorId;
                    if (message.authorName != null && message.hasOwnProperty("authorName"))
                        object.authorName = message.authorName;
                    if (message.text != null && message.hasOwnProperty("text"))
                        object.text = message.text;
                    if (message.timeMs != null && message.hasOwnProperty("timeMs"))
                        if (typeof message.timeMs === "number")
                            object.timeMs = options.longs === String ? String(message.timeMs) : message.timeMs;
                        else
                            object.timeMs = options.longs === String ? $util.Long.prototype.toString.call(message.timeMs) : options.longs === Number ? new $util.LongBits(message.timeMs.low >>> 0, message.timeMs.high >>> 0).toNumber(true) : message.timeMs;
                    return object;
                };

                /**
                 * Converts this ChatMessage to JSON.
                 * @function toJSON
                 * @memberof jrland.world.v1.ChatMessage
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ChatMessage.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ChatMessage
                 * @function getTypeUrl
                 * @memberof jrland.world.v1.ChatMessage
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ChatMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/jrland.world.v1.ChatMessage";
                };

                return ChatMessage;
            })();

            v1.WelcomeSnapshot = (function() {

                /**
                 * Properties of a WelcomeSnapshot.
                 * @memberof jrland.world.v1
                 * @interface IWelcomeSnapshot
                 * @property {string|null} [sessionId] WelcomeSnapshot sessionId
                 * @property {string|null} [worldId] WelcomeSnapshot worldId
                 * @property {string|null} [regionId] WelcomeSnapshot regionId
                 * @property {string|null} [selfPlayerId] WelcomeSnapshot selfPlayerId
                 * @property {Array.<jrland.world.v1.IEntitySnapshot>|null} [entities] WelcomeSnapshot entities
                 * @property {Array.<jrland.world.v1.IChunkSnapshot>|null} [chunks] WelcomeSnapshot chunks
                 * @property {Array.<jrland.world.v1.IInventorySlot>|null} [inventory] WelcomeSnapshot inventory
                 */

                /**
                 * Constructs a new WelcomeSnapshot.
                 * @memberof jrland.world.v1
                 * @classdesc Represents a WelcomeSnapshot.
                 * @implements IWelcomeSnapshot
                 * @constructor
                 * @param {jrland.world.v1.IWelcomeSnapshot=} [properties] Properties to set
                 */
                function WelcomeSnapshot(properties) {
                    this.entities = [];
                    this.chunks = [];
                    this.inventory = [];
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * WelcomeSnapshot sessionId.
                 * @member {string} sessionId
                 * @memberof jrland.world.v1.WelcomeSnapshot
                 * @instance
                 */
                WelcomeSnapshot.prototype.sessionId = "";

                /**
                 * WelcomeSnapshot worldId.
                 * @member {string} worldId
                 * @memberof jrland.world.v1.WelcomeSnapshot
                 * @instance
                 */
                WelcomeSnapshot.prototype.worldId = "";

                /**
                 * WelcomeSnapshot regionId.
                 * @member {string} regionId
                 * @memberof jrland.world.v1.WelcomeSnapshot
                 * @instance
                 */
                WelcomeSnapshot.prototype.regionId = "";

                /**
                 * WelcomeSnapshot selfPlayerId.
                 * @member {string} selfPlayerId
                 * @memberof jrland.world.v1.WelcomeSnapshot
                 * @instance
                 */
                WelcomeSnapshot.prototype.selfPlayerId = "";

                /**
                 * WelcomeSnapshot entities.
                 * @member {Array.<jrland.world.v1.IEntitySnapshot>} entities
                 * @memberof jrland.world.v1.WelcomeSnapshot
                 * @instance
                 */
                WelcomeSnapshot.prototype.entities = $util.emptyArray;

                /**
                 * WelcomeSnapshot chunks.
                 * @member {Array.<jrland.world.v1.IChunkSnapshot>} chunks
                 * @memberof jrland.world.v1.WelcomeSnapshot
                 * @instance
                 */
                WelcomeSnapshot.prototype.chunks = $util.emptyArray;

                /**
                 * WelcomeSnapshot inventory.
                 * @member {Array.<jrland.world.v1.IInventorySlot>} inventory
                 * @memberof jrland.world.v1.WelcomeSnapshot
                 * @instance
                 */
                WelcomeSnapshot.prototype.inventory = $util.emptyArray;

                /**
                 * Creates a new WelcomeSnapshot instance using the specified properties.
                 * @function create
                 * @memberof jrland.world.v1.WelcomeSnapshot
                 * @static
                 * @param {jrland.world.v1.IWelcomeSnapshot=} [properties] Properties to set
                 * @returns {jrland.world.v1.WelcomeSnapshot} WelcomeSnapshot instance
                 */
                WelcomeSnapshot.create = function create(properties) {
                    return new WelcomeSnapshot(properties);
                };

                /**
                 * Encodes the specified WelcomeSnapshot message. Does not implicitly {@link jrland.world.v1.WelcomeSnapshot.verify|verify} messages.
                 * @function encode
                 * @memberof jrland.world.v1.WelcomeSnapshot
                 * @static
                 * @param {jrland.world.v1.IWelcomeSnapshot} message WelcomeSnapshot message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                WelcomeSnapshot.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.sessionId != null && Object.hasOwnProperty.call(message, "sessionId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.sessionId);
                    if (message.worldId != null && Object.hasOwnProperty.call(message, "worldId"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.worldId);
                    if (message.regionId != null && Object.hasOwnProperty.call(message, "regionId"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.regionId);
                    if (message.selfPlayerId != null && Object.hasOwnProperty.call(message, "selfPlayerId"))
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.selfPlayerId);
                    if (message.entities != null && message.entities.length)
                        for (let i = 0; i < message.entities.length; ++i)
                            $root.jrland.world.v1.EntitySnapshot.encode(message.entities[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                    if (message.chunks != null && message.chunks.length)
                        for (let i = 0; i < message.chunks.length; ++i)
                            $root.jrland.world.v1.ChunkSnapshot.encode(message.chunks[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                    if (message.inventory != null && message.inventory.length)
                        for (let i = 0; i < message.inventory.length; ++i)
                            $root.jrland.world.v1.InventorySlot.encode(message.inventory[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified WelcomeSnapshot message, length delimited. Does not implicitly {@link jrland.world.v1.WelcomeSnapshot.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof jrland.world.v1.WelcomeSnapshot
                 * @static
                 * @param {jrland.world.v1.IWelcomeSnapshot} message WelcomeSnapshot message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                WelcomeSnapshot.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a WelcomeSnapshot message from the specified reader or buffer.
                 * @function decode
                 * @memberof jrland.world.v1.WelcomeSnapshot
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jrland.world.v1.WelcomeSnapshot} WelcomeSnapshot
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                WelcomeSnapshot.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.jrland.world.v1.WelcomeSnapshot();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.sessionId = reader.string();
                                break;
                            }
                        case 2: {
                                message.worldId = reader.string();
                                break;
                            }
                        case 3: {
                                message.regionId = reader.string();
                                break;
                            }
                        case 4: {
                                message.selfPlayerId = reader.string();
                                break;
                            }
                        case 5: {
                                if (!(message.entities && message.entities.length))
                                    message.entities = [];
                                message.entities.push($root.jrland.world.v1.EntitySnapshot.decode(reader, reader.uint32()));
                                break;
                            }
                        case 6: {
                                if (!(message.chunks && message.chunks.length))
                                    message.chunks = [];
                                message.chunks.push($root.jrland.world.v1.ChunkSnapshot.decode(reader, reader.uint32()));
                                break;
                            }
                        case 7: {
                                if (!(message.inventory && message.inventory.length))
                                    message.inventory = [];
                                message.inventory.push($root.jrland.world.v1.InventorySlot.decode(reader, reader.uint32()));
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a WelcomeSnapshot message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof jrland.world.v1.WelcomeSnapshot
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {jrland.world.v1.WelcomeSnapshot} WelcomeSnapshot
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                WelcomeSnapshot.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a WelcomeSnapshot message.
                 * @function verify
                 * @memberof jrland.world.v1.WelcomeSnapshot
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                WelcomeSnapshot.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.sessionId != null && message.hasOwnProperty("sessionId"))
                        if (!$util.isString(message.sessionId))
                            return "sessionId: string expected";
                    if (message.worldId != null && message.hasOwnProperty("worldId"))
                        if (!$util.isString(message.worldId))
                            return "worldId: string expected";
                    if (message.regionId != null && message.hasOwnProperty("regionId"))
                        if (!$util.isString(message.regionId))
                            return "regionId: string expected";
                    if (message.selfPlayerId != null && message.hasOwnProperty("selfPlayerId"))
                        if (!$util.isString(message.selfPlayerId))
                            return "selfPlayerId: string expected";
                    if (message.entities != null && message.hasOwnProperty("entities")) {
                        if (!Array.isArray(message.entities))
                            return "entities: array expected";
                        for (let i = 0; i < message.entities.length; ++i) {
                            let error = $root.jrland.world.v1.EntitySnapshot.verify(message.entities[i]);
                            if (error)
                                return "entities." + error;
                        }
                    }
                    if (message.chunks != null && message.hasOwnProperty("chunks")) {
                        if (!Array.isArray(message.chunks))
                            return "chunks: array expected";
                        for (let i = 0; i < message.chunks.length; ++i) {
                            let error = $root.jrland.world.v1.ChunkSnapshot.verify(message.chunks[i]);
                            if (error)
                                return "chunks." + error;
                        }
                    }
                    if (message.inventory != null && message.hasOwnProperty("inventory")) {
                        if (!Array.isArray(message.inventory))
                            return "inventory: array expected";
                        for (let i = 0; i < message.inventory.length; ++i) {
                            let error = $root.jrland.world.v1.InventorySlot.verify(message.inventory[i]);
                            if (error)
                                return "inventory." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a WelcomeSnapshot message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof jrland.world.v1.WelcomeSnapshot
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {jrland.world.v1.WelcomeSnapshot} WelcomeSnapshot
                 */
                WelcomeSnapshot.fromObject = function fromObject(object) {
                    if (object instanceof $root.jrland.world.v1.WelcomeSnapshot)
                        return object;
                    let message = new $root.jrland.world.v1.WelcomeSnapshot();
                    if (object.sessionId != null)
                        message.sessionId = String(object.sessionId);
                    if (object.worldId != null)
                        message.worldId = String(object.worldId);
                    if (object.regionId != null)
                        message.regionId = String(object.regionId);
                    if (object.selfPlayerId != null)
                        message.selfPlayerId = String(object.selfPlayerId);
                    if (object.entities) {
                        if (!Array.isArray(object.entities))
                            throw TypeError(".jrland.world.v1.WelcomeSnapshot.entities: array expected");
                        message.entities = [];
                        for (let i = 0; i < object.entities.length; ++i) {
                            if (typeof object.entities[i] !== "object")
                                throw TypeError(".jrland.world.v1.WelcomeSnapshot.entities: object expected");
                            message.entities[i] = $root.jrland.world.v1.EntitySnapshot.fromObject(object.entities[i]);
                        }
                    }
                    if (object.chunks) {
                        if (!Array.isArray(object.chunks))
                            throw TypeError(".jrland.world.v1.WelcomeSnapshot.chunks: array expected");
                        message.chunks = [];
                        for (let i = 0; i < object.chunks.length; ++i) {
                            if (typeof object.chunks[i] !== "object")
                                throw TypeError(".jrland.world.v1.WelcomeSnapshot.chunks: object expected");
                            message.chunks[i] = $root.jrland.world.v1.ChunkSnapshot.fromObject(object.chunks[i]);
                        }
                    }
                    if (object.inventory) {
                        if (!Array.isArray(object.inventory))
                            throw TypeError(".jrland.world.v1.WelcomeSnapshot.inventory: array expected");
                        message.inventory = [];
                        for (let i = 0; i < object.inventory.length; ++i) {
                            if (typeof object.inventory[i] !== "object")
                                throw TypeError(".jrland.world.v1.WelcomeSnapshot.inventory: object expected");
                            message.inventory[i] = $root.jrland.world.v1.InventorySlot.fromObject(object.inventory[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a WelcomeSnapshot message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof jrland.world.v1.WelcomeSnapshot
                 * @static
                 * @param {jrland.world.v1.WelcomeSnapshot} message WelcomeSnapshot
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                WelcomeSnapshot.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.arrays || options.defaults) {
                        object.entities = [];
                        object.chunks = [];
                        object.inventory = [];
                    }
                    if (options.defaults) {
                        object.sessionId = "";
                        object.worldId = "";
                        object.regionId = "";
                        object.selfPlayerId = "";
                    }
                    if (message.sessionId != null && message.hasOwnProperty("sessionId"))
                        object.sessionId = message.sessionId;
                    if (message.worldId != null && message.hasOwnProperty("worldId"))
                        object.worldId = message.worldId;
                    if (message.regionId != null && message.hasOwnProperty("regionId"))
                        object.regionId = message.regionId;
                    if (message.selfPlayerId != null && message.hasOwnProperty("selfPlayerId"))
                        object.selfPlayerId = message.selfPlayerId;
                    if (message.entities && message.entities.length) {
                        object.entities = [];
                        for (let j = 0; j < message.entities.length; ++j)
                            object.entities[j] = $root.jrland.world.v1.EntitySnapshot.toObject(message.entities[j], options);
                    }
                    if (message.chunks && message.chunks.length) {
                        object.chunks = [];
                        for (let j = 0; j < message.chunks.length; ++j)
                            object.chunks[j] = $root.jrland.world.v1.ChunkSnapshot.toObject(message.chunks[j], options);
                    }
                    if (message.inventory && message.inventory.length) {
                        object.inventory = [];
                        for (let j = 0; j < message.inventory.length; ++j)
                            object.inventory[j] = $root.jrland.world.v1.InventorySlot.toObject(message.inventory[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this WelcomeSnapshot to JSON.
                 * @function toJSON
                 * @memberof jrland.world.v1.WelcomeSnapshot
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                WelcomeSnapshot.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for WelcomeSnapshot
                 * @function getTypeUrl
                 * @memberof jrland.world.v1.WelcomeSnapshot
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                WelcomeSnapshot.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/jrland.world.v1.WelcomeSnapshot";
                };

                return WelcomeSnapshot;
            })();

            v1.WorldState = (function() {

                /**
                 * Properties of a WorldState.
                 * @memberof jrland.world.v1
                 * @interface IWorldState
                 * @property {Array.<jrland.world.v1.IEntitySnapshot>|null} [entities] WorldState entities
                 * @property {Array.<jrland.world.v1.IChunkSnapshot>|null} [chunks] WorldState chunks
                 * @property {Array.<jrland.world.v1.IInventorySlot>|null} [inventory] WorldState inventory
                 */

                /**
                 * Constructs a new WorldState.
                 * @memberof jrland.world.v1
                 * @classdesc Represents a WorldState.
                 * @implements IWorldState
                 * @constructor
                 * @param {jrland.world.v1.IWorldState=} [properties] Properties to set
                 */
                function WorldState(properties) {
                    this.entities = [];
                    this.chunks = [];
                    this.inventory = [];
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * WorldState entities.
                 * @member {Array.<jrland.world.v1.IEntitySnapshot>} entities
                 * @memberof jrland.world.v1.WorldState
                 * @instance
                 */
                WorldState.prototype.entities = $util.emptyArray;

                /**
                 * WorldState chunks.
                 * @member {Array.<jrland.world.v1.IChunkSnapshot>} chunks
                 * @memberof jrland.world.v1.WorldState
                 * @instance
                 */
                WorldState.prototype.chunks = $util.emptyArray;

                /**
                 * WorldState inventory.
                 * @member {Array.<jrland.world.v1.IInventorySlot>} inventory
                 * @memberof jrland.world.v1.WorldState
                 * @instance
                 */
                WorldState.prototype.inventory = $util.emptyArray;

                /**
                 * Creates a new WorldState instance using the specified properties.
                 * @function create
                 * @memberof jrland.world.v1.WorldState
                 * @static
                 * @param {jrland.world.v1.IWorldState=} [properties] Properties to set
                 * @returns {jrland.world.v1.WorldState} WorldState instance
                 */
                WorldState.create = function create(properties) {
                    return new WorldState(properties);
                };

                /**
                 * Encodes the specified WorldState message. Does not implicitly {@link jrland.world.v1.WorldState.verify|verify} messages.
                 * @function encode
                 * @memberof jrland.world.v1.WorldState
                 * @static
                 * @param {jrland.world.v1.IWorldState} message WorldState message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                WorldState.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.entities != null && message.entities.length)
                        for (let i = 0; i < message.entities.length; ++i)
                            $root.jrland.world.v1.EntitySnapshot.encode(message.entities[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.chunks != null && message.chunks.length)
                        for (let i = 0; i < message.chunks.length; ++i)
                            $root.jrland.world.v1.ChunkSnapshot.encode(message.chunks[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.inventory != null && message.inventory.length)
                        for (let i = 0; i < message.inventory.length; ++i)
                            $root.jrland.world.v1.InventorySlot.encode(message.inventory[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified WorldState message, length delimited. Does not implicitly {@link jrland.world.v1.WorldState.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof jrland.world.v1.WorldState
                 * @static
                 * @param {jrland.world.v1.IWorldState} message WorldState message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                WorldState.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a WorldState message from the specified reader or buffer.
                 * @function decode
                 * @memberof jrland.world.v1.WorldState
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jrland.world.v1.WorldState} WorldState
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                WorldState.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.jrland.world.v1.WorldState();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                if (!(message.entities && message.entities.length))
                                    message.entities = [];
                                message.entities.push($root.jrland.world.v1.EntitySnapshot.decode(reader, reader.uint32()));
                                break;
                            }
                        case 2: {
                                if (!(message.chunks && message.chunks.length))
                                    message.chunks = [];
                                message.chunks.push($root.jrland.world.v1.ChunkSnapshot.decode(reader, reader.uint32()));
                                break;
                            }
                        case 3: {
                                if (!(message.inventory && message.inventory.length))
                                    message.inventory = [];
                                message.inventory.push($root.jrland.world.v1.InventorySlot.decode(reader, reader.uint32()));
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a WorldState message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof jrland.world.v1.WorldState
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {jrland.world.v1.WorldState} WorldState
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                WorldState.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a WorldState message.
                 * @function verify
                 * @memberof jrland.world.v1.WorldState
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                WorldState.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.entities != null && message.hasOwnProperty("entities")) {
                        if (!Array.isArray(message.entities))
                            return "entities: array expected";
                        for (let i = 0; i < message.entities.length; ++i) {
                            let error = $root.jrland.world.v1.EntitySnapshot.verify(message.entities[i]);
                            if (error)
                                return "entities." + error;
                        }
                    }
                    if (message.chunks != null && message.hasOwnProperty("chunks")) {
                        if (!Array.isArray(message.chunks))
                            return "chunks: array expected";
                        for (let i = 0; i < message.chunks.length; ++i) {
                            let error = $root.jrland.world.v1.ChunkSnapshot.verify(message.chunks[i]);
                            if (error)
                                return "chunks." + error;
                        }
                    }
                    if (message.inventory != null && message.hasOwnProperty("inventory")) {
                        if (!Array.isArray(message.inventory))
                            return "inventory: array expected";
                        for (let i = 0; i < message.inventory.length; ++i) {
                            let error = $root.jrland.world.v1.InventorySlot.verify(message.inventory[i]);
                            if (error)
                                return "inventory." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a WorldState message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof jrland.world.v1.WorldState
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {jrland.world.v1.WorldState} WorldState
                 */
                WorldState.fromObject = function fromObject(object) {
                    if (object instanceof $root.jrland.world.v1.WorldState)
                        return object;
                    let message = new $root.jrland.world.v1.WorldState();
                    if (object.entities) {
                        if (!Array.isArray(object.entities))
                            throw TypeError(".jrland.world.v1.WorldState.entities: array expected");
                        message.entities = [];
                        for (let i = 0; i < object.entities.length; ++i) {
                            if (typeof object.entities[i] !== "object")
                                throw TypeError(".jrland.world.v1.WorldState.entities: object expected");
                            message.entities[i] = $root.jrland.world.v1.EntitySnapshot.fromObject(object.entities[i]);
                        }
                    }
                    if (object.chunks) {
                        if (!Array.isArray(object.chunks))
                            throw TypeError(".jrland.world.v1.WorldState.chunks: array expected");
                        message.chunks = [];
                        for (let i = 0; i < object.chunks.length; ++i) {
                            if (typeof object.chunks[i] !== "object")
                                throw TypeError(".jrland.world.v1.WorldState.chunks: object expected");
                            message.chunks[i] = $root.jrland.world.v1.ChunkSnapshot.fromObject(object.chunks[i]);
                        }
                    }
                    if (object.inventory) {
                        if (!Array.isArray(object.inventory))
                            throw TypeError(".jrland.world.v1.WorldState.inventory: array expected");
                        message.inventory = [];
                        for (let i = 0; i < object.inventory.length; ++i) {
                            if (typeof object.inventory[i] !== "object")
                                throw TypeError(".jrland.world.v1.WorldState.inventory: object expected");
                            message.inventory[i] = $root.jrland.world.v1.InventorySlot.fromObject(object.inventory[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a WorldState message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof jrland.world.v1.WorldState
                 * @static
                 * @param {jrland.world.v1.WorldState} message WorldState
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                WorldState.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.arrays || options.defaults) {
                        object.entities = [];
                        object.chunks = [];
                        object.inventory = [];
                    }
                    if (message.entities && message.entities.length) {
                        object.entities = [];
                        for (let j = 0; j < message.entities.length; ++j)
                            object.entities[j] = $root.jrland.world.v1.EntitySnapshot.toObject(message.entities[j], options);
                    }
                    if (message.chunks && message.chunks.length) {
                        object.chunks = [];
                        for (let j = 0; j < message.chunks.length; ++j)
                            object.chunks[j] = $root.jrland.world.v1.ChunkSnapshot.toObject(message.chunks[j], options);
                    }
                    if (message.inventory && message.inventory.length) {
                        object.inventory = [];
                        for (let j = 0; j < message.inventory.length; ++j)
                            object.inventory[j] = $root.jrland.world.v1.InventorySlot.toObject(message.inventory[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this WorldState to JSON.
                 * @function toJSON
                 * @memberof jrland.world.v1.WorldState
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                WorldState.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for WorldState
                 * @function getTypeUrl
                 * @memberof jrland.world.v1.WorldState
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                WorldState.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/jrland.world.v1.WorldState";
                };

                return WorldState;
            })();

            v1.InventoryDelta = (function() {

                /**
                 * Properties of an InventoryDelta.
                 * @memberof jrland.world.v1
                 * @interface IInventoryDelta
                 * @property {Array.<jrland.world.v1.IInventorySlot>|null} [slots] InventoryDelta slots
                 */

                /**
                 * Constructs a new InventoryDelta.
                 * @memberof jrland.world.v1
                 * @classdesc Represents an InventoryDelta.
                 * @implements IInventoryDelta
                 * @constructor
                 * @param {jrland.world.v1.IInventoryDelta=} [properties] Properties to set
                 */
                function InventoryDelta(properties) {
                    this.slots = [];
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * InventoryDelta slots.
                 * @member {Array.<jrland.world.v1.IInventorySlot>} slots
                 * @memberof jrland.world.v1.InventoryDelta
                 * @instance
                 */
                InventoryDelta.prototype.slots = $util.emptyArray;

                /**
                 * Creates a new InventoryDelta instance using the specified properties.
                 * @function create
                 * @memberof jrland.world.v1.InventoryDelta
                 * @static
                 * @param {jrland.world.v1.IInventoryDelta=} [properties] Properties to set
                 * @returns {jrland.world.v1.InventoryDelta} InventoryDelta instance
                 */
                InventoryDelta.create = function create(properties) {
                    return new InventoryDelta(properties);
                };

                /**
                 * Encodes the specified InventoryDelta message. Does not implicitly {@link jrland.world.v1.InventoryDelta.verify|verify} messages.
                 * @function encode
                 * @memberof jrland.world.v1.InventoryDelta
                 * @static
                 * @param {jrland.world.v1.IInventoryDelta} message InventoryDelta message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InventoryDelta.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.slots != null && message.slots.length)
                        for (let i = 0; i < message.slots.length; ++i)
                            $root.jrland.world.v1.InventorySlot.encode(message.slots[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified InventoryDelta message, length delimited. Does not implicitly {@link jrland.world.v1.InventoryDelta.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof jrland.world.v1.InventoryDelta
                 * @static
                 * @param {jrland.world.v1.IInventoryDelta} message InventoryDelta message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InventoryDelta.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an InventoryDelta message from the specified reader or buffer.
                 * @function decode
                 * @memberof jrland.world.v1.InventoryDelta
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jrland.world.v1.InventoryDelta} InventoryDelta
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                InventoryDelta.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.jrland.world.v1.InventoryDelta();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                if (!(message.slots && message.slots.length))
                                    message.slots = [];
                                message.slots.push($root.jrland.world.v1.InventorySlot.decode(reader, reader.uint32()));
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an InventoryDelta message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof jrland.world.v1.InventoryDelta
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {jrland.world.v1.InventoryDelta} InventoryDelta
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                InventoryDelta.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an InventoryDelta message.
                 * @function verify
                 * @memberof jrland.world.v1.InventoryDelta
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                InventoryDelta.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.slots != null && message.hasOwnProperty("slots")) {
                        if (!Array.isArray(message.slots))
                            return "slots: array expected";
                        for (let i = 0; i < message.slots.length; ++i) {
                            let error = $root.jrland.world.v1.InventorySlot.verify(message.slots[i]);
                            if (error)
                                return "slots." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates an InventoryDelta message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof jrland.world.v1.InventoryDelta
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {jrland.world.v1.InventoryDelta} InventoryDelta
                 */
                InventoryDelta.fromObject = function fromObject(object) {
                    if (object instanceof $root.jrland.world.v1.InventoryDelta)
                        return object;
                    let message = new $root.jrland.world.v1.InventoryDelta();
                    if (object.slots) {
                        if (!Array.isArray(object.slots))
                            throw TypeError(".jrland.world.v1.InventoryDelta.slots: array expected");
                        message.slots = [];
                        for (let i = 0; i < object.slots.length; ++i) {
                            if (typeof object.slots[i] !== "object")
                                throw TypeError(".jrland.world.v1.InventoryDelta.slots: object expected");
                            message.slots[i] = $root.jrland.world.v1.InventorySlot.fromObject(object.slots[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from an InventoryDelta message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof jrland.world.v1.InventoryDelta
                 * @static
                 * @param {jrland.world.v1.InventoryDelta} message InventoryDelta
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                InventoryDelta.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.arrays || options.defaults)
                        object.slots = [];
                    if (message.slots && message.slots.length) {
                        object.slots = [];
                        for (let j = 0; j < message.slots.length; ++j)
                            object.slots[j] = $root.jrland.world.v1.InventorySlot.toObject(message.slots[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this InventoryDelta to JSON.
                 * @function toJSON
                 * @memberof jrland.world.v1.InventoryDelta
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                InventoryDelta.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for InventoryDelta
                 * @function getTypeUrl
                 * @memberof jrland.world.v1.InventoryDelta
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                InventoryDelta.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/jrland.world.v1.InventoryDelta";
                };

                return InventoryDelta;
            })();

            v1.HandoffPrepare = (function() {

                /**
                 * Properties of a HandoffPrepare.
                 * @memberof jrland.world.v1
                 * @interface IHandoffPrepare
                 * @property {string|null} [nextRegionId] HandoffPrepare nextRegionId
                 * @property {string|null} [nextAddress] HandoffPrepare nextAddress
                 * @property {string|null} [ticket] HandoffPrepare ticket
                 */

                /**
                 * Constructs a new HandoffPrepare.
                 * @memberof jrland.world.v1
                 * @classdesc Represents a HandoffPrepare.
                 * @implements IHandoffPrepare
                 * @constructor
                 * @param {jrland.world.v1.IHandoffPrepare=} [properties] Properties to set
                 */
                function HandoffPrepare(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * HandoffPrepare nextRegionId.
                 * @member {string} nextRegionId
                 * @memberof jrland.world.v1.HandoffPrepare
                 * @instance
                 */
                HandoffPrepare.prototype.nextRegionId = "";

                /**
                 * HandoffPrepare nextAddress.
                 * @member {string} nextAddress
                 * @memberof jrland.world.v1.HandoffPrepare
                 * @instance
                 */
                HandoffPrepare.prototype.nextAddress = "";

                /**
                 * HandoffPrepare ticket.
                 * @member {string} ticket
                 * @memberof jrland.world.v1.HandoffPrepare
                 * @instance
                 */
                HandoffPrepare.prototype.ticket = "";

                /**
                 * Creates a new HandoffPrepare instance using the specified properties.
                 * @function create
                 * @memberof jrland.world.v1.HandoffPrepare
                 * @static
                 * @param {jrland.world.v1.IHandoffPrepare=} [properties] Properties to set
                 * @returns {jrland.world.v1.HandoffPrepare} HandoffPrepare instance
                 */
                HandoffPrepare.create = function create(properties) {
                    return new HandoffPrepare(properties);
                };

                /**
                 * Encodes the specified HandoffPrepare message. Does not implicitly {@link jrland.world.v1.HandoffPrepare.verify|verify} messages.
                 * @function encode
                 * @memberof jrland.world.v1.HandoffPrepare
                 * @static
                 * @param {jrland.world.v1.IHandoffPrepare} message HandoffPrepare message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                HandoffPrepare.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.nextRegionId != null && Object.hasOwnProperty.call(message, "nextRegionId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.nextRegionId);
                    if (message.nextAddress != null && Object.hasOwnProperty.call(message, "nextAddress"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.nextAddress);
                    if (message.ticket != null && Object.hasOwnProperty.call(message, "ticket"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.ticket);
                    return writer;
                };

                /**
                 * Encodes the specified HandoffPrepare message, length delimited. Does not implicitly {@link jrland.world.v1.HandoffPrepare.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof jrland.world.v1.HandoffPrepare
                 * @static
                 * @param {jrland.world.v1.IHandoffPrepare} message HandoffPrepare message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                HandoffPrepare.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a HandoffPrepare message from the specified reader or buffer.
                 * @function decode
                 * @memberof jrland.world.v1.HandoffPrepare
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jrland.world.v1.HandoffPrepare} HandoffPrepare
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                HandoffPrepare.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.jrland.world.v1.HandoffPrepare();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.nextRegionId = reader.string();
                                break;
                            }
                        case 2: {
                                message.nextAddress = reader.string();
                                break;
                            }
                        case 3: {
                                message.ticket = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a HandoffPrepare message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof jrland.world.v1.HandoffPrepare
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {jrland.world.v1.HandoffPrepare} HandoffPrepare
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                HandoffPrepare.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a HandoffPrepare message.
                 * @function verify
                 * @memberof jrland.world.v1.HandoffPrepare
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                HandoffPrepare.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.nextRegionId != null && message.hasOwnProperty("nextRegionId"))
                        if (!$util.isString(message.nextRegionId))
                            return "nextRegionId: string expected";
                    if (message.nextAddress != null && message.hasOwnProperty("nextAddress"))
                        if (!$util.isString(message.nextAddress))
                            return "nextAddress: string expected";
                    if (message.ticket != null && message.hasOwnProperty("ticket"))
                        if (!$util.isString(message.ticket))
                            return "ticket: string expected";
                    return null;
                };

                /**
                 * Creates a HandoffPrepare message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof jrland.world.v1.HandoffPrepare
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {jrland.world.v1.HandoffPrepare} HandoffPrepare
                 */
                HandoffPrepare.fromObject = function fromObject(object) {
                    if (object instanceof $root.jrland.world.v1.HandoffPrepare)
                        return object;
                    let message = new $root.jrland.world.v1.HandoffPrepare();
                    if (object.nextRegionId != null)
                        message.nextRegionId = String(object.nextRegionId);
                    if (object.nextAddress != null)
                        message.nextAddress = String(object.nextAddress);
                    if (object.ticket != null)
                        message.ticket = String(object.ticket);
                    return message;
                };

                /**
                 * Creates a plain object from a HandoffPrepare message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof jrland.world.v1.HandoffPrepare
                 * @static
                 * @param {jrland.world.v1.HandoffPrepare} message HandoffPrepare
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                HandoffPrepare.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.nextRegionId = "";
                        object.nextAddress = "";
                        object.ticket = "";
                    }
                    if (message.nextRegionId != null && message.hasOwnProperty("nextRegionId"))
                        object.nextRegionId = message.nextRegionId;
                    if (message.nextAddress != null && message.hasOwnProperty("nextAddress"))
                        object.nextAddress = message.nextAddress;
                    if (message.ticket != null && message.hasOwnProperty("ticket"))
                        object.ticket = message.ticket;
                    return object;
                };

                /**
                 * Converts this HandoffPrepare to JSON.
                 * @function toJSON
                 * @memberof jrland.world.v1.HandoffPrepare
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                HandoffPrepare.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for HandoffPrepare
                 * @function getTypeUrl
                 * @memberof jrland.world.v1.HandoffPrepare
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                HandoffPrepare.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/jrland.world.v1.HandoffPrepare";
                };

                return HandoffPrepare;
            })();

            v1.HandoffCommit = (function() {

                /**
                 * Properties of a HandoffCommit.
                 * @memberof jrland.world.v1
                 * @interface IHandoffCommit
                 * @property {string|null} [nextRegionId] HandoffCommit nextRegionId
                 */

                /**
                 * Constructs a new HandoffCommit.
                 * @memberof jrland.world.v1
                 * @classdesc Represents a HandoffCommit.
                 * @implements IHandoffCommit
                 * @constructor
                 * @param {jrland.world.v1.IHandoffCommit=} [properties] Properties to set
                 */
                function HandoffCommit(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * HandoffCommit nextRegionId.
                 * @member {string} nextRegionId
                 * @memberof jrland.world.v1.HandoffCommit
                 * @instance
                 */
                HandoffCommit.prototype.nextRegionId = "";

                /**
                 * Creates a new HandoffCommit instance using the specified properties.
                 * @function create
                 * @memberof jrland.world.v1.HandoffCommit
                 * @static
                 * @param {jrland.world.v1.IHandoffCommit=} [properties] Properties to set
                 * @returns {jrland.world.v1.HandoffCommit} HandoffCommit instance
                 */
                HandoffCommit.create = function create(properties) {
                    return new HandoffCommit(properties);
                };

                /**
                 * Encodes the specified HandoffCommit message. Does not implicitly {@link jrland.world.v1.HandoffCommit.verify|verify} messages.
                 * @function encode
                 * @memberof jrland.world.v1.HandoffCommit
                 * @static
                 * @param {jrland.world.v1.IHandoffCommit} message HandoffCommit message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                HandoffCommit.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.nextRegionId != null && Object.hasOwnProperty.call(message, "nextRegionId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.nextRegionId);
                    return writer;
                };

                /**
                 * Encodes the specified HandoffCommit message, length delimited. Does not implicitly {@link jrland.world.v1.HandoffCommit.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof jrland.world.v1.HandoffCommit
                 * @static
                 * @param {jrland.world.v1.IHandoffCommit} message HandoffCommit message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                HandoffCommit.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a HandoffCommit message from the specified reader or buffer.
                 * @function decode
                 * @memberof jrland.world.v1.HandoffCommit
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jrland.world.v1.HandoffCommit} HandoffCommit
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                HandoffCommit.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.jrland.world.v1.HandoffCommit();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.nextRegionId = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a HandoffCommit message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof jrland.world.v1.HandoffCommit
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {jrland.world.v1.HandoffCommit} HandoffCommit
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                HandoffCommit.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a HandoffCommit message.
                 * @function verify
                 * @memberof jrland.world.v1.HandoffCommit
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                HandoffCommit.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.nextRegionId != null && message.hasOwnProperty("nextRegionId"))
                        if (!$util.isString(message.nextRegionId))
                            return "nextRegionId: string expected";
                    return null;
                };

                /**
                 * Creates a HandoffCommit message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof jrland.world.v1.HandoffCommit
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {jrland.world.v1.HandoffCommit} HandoffCommit
                 */
                HandoffCommit.fromObject = function fromObject(object) {
                    if (object instanceof $root.jrland.world.v1.HandoffCommit)
                        return object;
                    let message = new $root.jrland.world.v1.HandoffCommit();
                    if (object.nextRegionId != null)
                        message.nextRegionId = String(object.nextRegionId);
                    return message;
                };

                /**
                 * Creates a plain object from a HandoffCommit message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof jrland.world.v1.HandoffCommit
                 * @static
                 * @param {jrland.world.v1.HandoffCommit} message HandoffCommit
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                HandoffCommit.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults)
                        object.nextRegionId = "";
                    if (message.nextRegionId != null && message.hasOwnProperty("nextRegionId"))
                        object.nextRegionId = message.nextRegionId;
                    return object;
                };

                /**
                 * Converts this HandoffCommit to JSON.
                 * @function toJSON
                 * @memberof jrland.world.v1.HandoffCommit
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                HandoffCommit.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for HandoffCommit
                 * @function getTypeUrl
                 * @memberof jrland.world.v1.HandoffCommit
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                HandoffCommit.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/jrland.world.v1.HandoffCommit";
                };

                return HandoffCommit;
            })();

            v1.ServerError = (function() {

                /**
                 * Properties of a ServerError.
                 * @memberof jrland.world.v1
                 * @interface IServerError
                 * @property {string|null} [code] ServerError code
                 * @property {string|null} [message] ServerError message
                 */

                /**
                 * Constructs a new ServerError.
                 * @memberof jrland.world.v1
                 * @classdesc Represents a ServerError.
                 * @implements IServerError
                 * @constructor
                 * @param {jrland.world.v1.IServerError=} [properties] Properties to set
                 */
                function ServerError(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ServerError code.
                 * @member {string} code
                 * @memberof jrland.world.v1.ServerError
                 * @instance
                 */
                ServerError.prototype.code = "";

                /**
                 * ServerError message.
                 * @member {string} message
                 * @memberof jrland.world.v1.ServerError
                 * @instance
                 */
                ServerError.prototype.message = "";

                /**
                 * Creates a new ServerError instance using the specified properties.
                 * @function create
                 * @memberof jrland.world.v1.ServerError
                 * @static
                 * @param {jrland.world.v1.IServerError=} [properties] Properties to set
                 * @returns {jrland.world.v1.ServerError} ServerError instance
                 */
                ServerError.create = function create(properties) {
                    return new ServerError(properties);
                };

                /**
                 * Encodes the specified ServerError message. Does not implicitly {@link jrland.world.v1.ServerError.verify|verify} messages.
                 * @function encode
                 * @memberof jrland.world.v1.ServerError
                 * @static
                 * @param {jrland.world.v1.IServerError} message ServerError message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ServerError.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.code);
                    if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
                    return writer;
                };

                /**
                 * Encodes the specified ServerError message, length delimited. Does not implicitly {@link jrland.world.v1.ServerError.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof jrland.world.v1.ServerError
                 * @static
                 * @param {jrland.world.v1.IServerError} message ServerError message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ServerError.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ServerError message from the specified reader or buffer.
                 * @function decode
                 * @memberof jrland.world.v1.ServerError
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jrland.world.v1.ServerError} ServerError
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ServerError.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.jrland.world.v1.ServerError();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.code = reader.string();
                                break;
                            }
                        case 2: {
                                message.message = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ServerError message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof jrland.world.v1.ServerError
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {jrland.world.v1.ServerError} ServerError
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ServerError.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ServerError message.
                 * @function verify
                 * @memberof jrland.world.v1.ServerError
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ServerError.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.code != null && message.hasOwnProperty("code"))
                        if (!$util.isString(message.code))
                            return "code: string expected";
                    if (message.message != null && message.hasOwnProperty("message"))
                        if (!$util.isString(message.message))
                            return "message: string expected";
                    return null;
                };

                /**
                 * Creates a ServerError message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof jrland.world.v1.ServerError
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {jrland.world.v1.ServerError} ServerError
                 */
                ServerError.fromObject = function fromObject(object) {
                    if (object instanceof $root.jrland.world.v1.ServerError)
                        return object;
                    let message = new $root.jrland.world.v1.ServerError();
                    if (object.code != null)
                        message.code = String(object.code);
                    if (object.message != null)
                        message.message = String(object.message);
                    return message;
                };

                /**
                 * Creates a plain object from a ServerError message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof jrland.world.v1.ServerError
                 * @static
                 * @param {jrland.world.v1.ServerError} message ServerError
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ServerError.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.code = "";
                        object.message = "";
                    }
                    if (message.code != null && message.hasOwnProperty("code"))
                        object.code = message.code;
                    if (message.message != null && message.hasOwnProperty("message"))
                        object.message = message.message;
                    return object;
                };

                /**
                 * Converts this ServerError to JSON.
                 * @function toJSON
                 * @memberof jrland.world.v1.ServerError
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ServerError.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ServerError
                 * @function getTypeUrl
                 * @memberof jrland.world.v1.ServerError
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ServerError.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/jrland.world.v1.ServerError";
                };

                return ServerError;
            })();

            v1.Ack = (function() {

                /**
                 * Properties of an Ack.
                 * @memberof jrland.world.v1
                 * @interface IAck
                 * @property {number|null} [seq] Ack seq
                 */

                /**
                 * Constructs a new Ack.
                 * @memberof jrland.world.v1
                 * @classdesc Represents an Ack.
                 * @implements IAck
                 * @constructor
                 * @param {jrland.world.v1.IAck=} [properties] Properties to set
                 */
                function Ack(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Ack seq.
                 * @member {number} seq
                 * @memberof jrland.world.v1.Ack
                 * @instance
                 */
                Ack.prototype.seq = 0;

                /**
                 * Creates a new Ack instance using the specified properties.
                 * @function create
                 * @memberof jrland.world.v1.Ack
                 * @static
                 * @param {jrland.world.v1.IAck=} [properties] Properties to set
                 * @returns {jrland.world.v1.Ack} Ack instance
                 */
                Ack.create = function create(properties) {
                    return new Ack(properties);
                };

                /**
                 * Encodes the specified Ack message. Does not implicitly {@link jrland.world.v1.Ack.verify|verify} messages.
                 * @function encode
                 * @memberof jrland.world.v1.Ack
                 * @static
                 * @param {jrland.world.v1.IAck} message Ack message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Ack.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.seq != null && Object.hasOwnProperty.call(message, "seq"))
                        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.seq);
                    return writer;
                };

                /**
                 * Encodes the specified Ack message, length delimited. Does not implicitly {@link jrland.world.v1.Ack.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof jrland.world.v1.Ack
                 * @static
                 * @param {jrland.world.v1.IAck} message Ack message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Ack.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an Ack message from the specified reader or buffer.
                 * @function decode
                 * @memberof jrland.world.v1.Ack
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jrland.world.v1.Ack} Ack
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Ack.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.jrland.world.v1.Ack();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.seq = reader.uint32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an Ack message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof jrland.world.v1.Ack
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {jrland.world.v1.Ack} Ack
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Ack.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an Ack message.
                 * @function verify
                 * @memberof jrland.world.v1.Ack
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Ack.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.seq != null && message.hasOwnProperty("seq"))
                        if (!$util.isInteger(message.seq))
                            return "seq: integer expected";
                    return null;
                };

                /**
                 * Creates an Ack message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof jrland.world.v1.Ack
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {jrland.world.v1.Ack} Ack
                 */
                Ack.fromObject = function fromObject(object) {
                    if (object instanceof $root.jrland.world.v1.Ack)
                        return object;
                    let message = new $root.jrland.world.v1.Ack();
                    if (object.seq != null)
                        message.seq = object.seq >>> 0;
                    return message;
                };

                /**
                 * Creates a plain object from an Ack message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof jrland.world.v1.Ack
                 * @static
                 * @param {jrland.world.v1.Ack} message Ack
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Ack.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults)
                        object.seq = 0;
                    if (message.seq != null && message.hasOwnProperty("seq"))
                        object.seq = message.seq;
                    return object;
                };

                /**
                 * Converts this Ack to JSON.
                 * @function toJSON
                 * @memberof jrland.world.v1.Ack
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Ack.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for Ack
                 * @function getTypeUrl
                 * @memberof jrland.world.v1.Ack
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                Ack.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/jrland.world.v1.Ack";
                };

                return Ack;
            })();

            v1.ClientHello = (function() {

                /**
                 * Properties of a ClientHello.
                 * @memberof jrland.world.v1
                 * @interface IClientHello
                 * @property {string|null} [ticket] ClientHello ticket
                 * @property {string|null} [clientName] ClientHello clientName
                 */

                /**
                 * Constructs a new ClientHello.
                 * @memberof jrland.world.v1
                 * @classdesc Represents a ClientHello.
                 * @implements IClientHello
                 * @constructor
                 * @param {jrland.world.v1.IClientHello=} [properties] Properties to set
                 */
                function ClientHello(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ClientHello ticket.
                 * @member {string} ticket
                 * @memberof jrland.world.v1.ClientHello
                 * @instance
                 */
                ClientHello.prototype.ticket = "";

                /**
                 * ClientHello clientName.
                 * @member {string} clientName
                 * @memberof jrland.world.v1.ClientHello
                 * @instance
                 */
                ClientHello.prototype.clientName = "";

                /**
                 * Creates a new ClientHello instance using the specified properties.
                 * @function create
                 * @memberof jrland.world.v1.ClientHello
                 * @static
                 * @param {jrland.world.v1.IClientHello=} [properties] Properties to set
                 * @returns {jrland.world.v1.ClientHello} ClientHello instance
                 */
                ClientHello.create = function create(properties) {
                    return new ClientHello(properties);
                };

                /**
                 * Encodes the specified ClientHello message. Does not implicitly {@link jrland.world.v1.ClientHello.verify|verify} messages.
                 * @function encode
                 * @memberof jrland.world.v1.ClientHello
                 * @static
                 * @param {jrland.world.v1.IClientHello} message ClientHello message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ClientHello.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.ticket != null && Object.hasOwnProperty.call(message, "ticket"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.ticket);
                    if (message.clientName != null && Object.hasOwnProperty.call(message, "clientName"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.clientName);
                    return writer;
                };

                /**
                 * Encodes the specified ClientHello message, length delimited. Does not implicitly {@link jrland.world.v1.ClientHello.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof jrland.world.v1.ClientHello
                 * @static
                 * @param {jrland.world.v1.IClientHello} message ClientHello message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ClientHello.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ClientHello message from the specified reader or buffer.
                 * @function decode
                 * @memberof jrland.world.v1.ClientHello
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jrland.world.v1.ClientHello} ClientHello
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ClientHello.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.jrland.world.v1.ClientHello();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.ticket = reader.string();
                                break;
                            }
                        case 2: {
                                message.clientName = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ClientHello message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof jrland.world.v1.ClientHello
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {jrland.world.v1.ClientHello} ClientHello
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ClientHello.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ClientHello message.
                 * @function verify
                 * @memberof jrland.world.v1.ClientHello
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ClientHello.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.ticket != null && message.hasOwnProperty("ticket"))
                        if (!$util.isString(message.ticket))
                            return "ticket: string expected";
                    if (message.clientName != null && message.hasOwnProperty("clientName"))
                        if (!$util.isString(message.clientName))
                            return "clientName: string expected";
                    return null;
                };

                /**
                 * Creates a ClientHello message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof jrland.world.v1.ClientHello
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {jrland.world.v1.ClientHello} ClientHello
                 */
                ClientHello.fromObject = function fromObject(object) {
                    if (object instanceof $root.jrland.world.v1.ClientHello)
                        return object;
                    let message = new $root.jrland.world.v1.ClientHello();
                    if (object.ticket != null)
                        message.ticket = String(object.ticket);
                    if (object.clientName != null)
                        message.clientName = String(object.clientName);
                    return message;
                };

                /**
                 * Creates a plain object from a ClientHello message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof jrland.world.v1.ClientHello
                 * @static
                 * @param {jrland.world.v1.ClientHello} message ClientHello
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ClientHello.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.ticket = "";
                        object.clientName = "";
                    }
                    if (message.ticket != null && message.hasOwnProperty("ticket"))
                        object.ticket = message.ticket;
                    if (message.clientName != null && message.hasOwnProperty("clientName"))
                        object.clientName = message.clientName;
                    return object;
                };

                /**
                 * Converts this ClientHello to JSON.
                 * @function toJSON
                 * @memberof jrland.world.v1.ClientHello
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ClientHello.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ClientHello
                 * @function getTypeUrl
                 * @memberof jrland.world.v1.ClientHello
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ClientHello.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/jrland.world.v1.ClientHello";
                };

                return ClientHello;
            })();

            v1.MoveIntent = (function() {

                /**
                 * Properties of a MoveIntent.
                 * @memberof jrland.world.v1
                 * @interface IMoveIntent
                 * @property {number|null} [moveX] MoveIntent moveX
                 * @property {number|null} [moveZ] MoveIntent moveZ
                 * @property {boolean|null} [sprint] MoveIntent sprint
                 * @property {number|null} [yaw] MoveIntent yaw
                 */

                /**
                 * Constructs a new MoveIntent.
                 * @memberof jrland.world.v1
                 * @classdesc Represents a MoveIntent.
                 * @implements IMoveIntent
                 * @constructor
                 * @param {jrland.world.v1.IMoveIntent=} [properties] Properties to set
                 */
                function MoveIntent(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * MoveIntent moveX.
                 * @member {number} moveX
                 * @memberof jrland.world.v1.MoveIntent
                 * @instance
                 */
                MoveIntent.prototype.moveX = 0;

                /**
                 * MoveIntent moveZ.
                 * @member {number} moveZ
                 * @memberof jrland.world.v1.MoveIntent
                 * @instance
                 */
                MoveIntent.prototype.moveZ = 0;

                /**
                 * MoveIntent sprint.
                 * @member {boolean} sprint
                 * @memberof jrland.world.v1.MoveIntent
                 * @instance
                 */
                MoveIntent.prototype.sprint = false;

                /**
                 * MoveIntent yaw.
                 * @member {number} yaw
                 * @memberof jrland.world.v1.MoveIntent
                 * @instance
                 */
                MoveIntent.prototype.yaw = 0;

                /**
                 * Creates a new MoveIntent instance using the specified properties.
                 * @function create
                 * @memberof jrland.world.v1.MoveIntent
                 * @static
                 * @param {jrland.world.v1.IMoveIntent=} [properties] Properties to set
                 * @returns {jrland.world.v1.MoveIntent} MoveIntent instance
                 */
                MoveIntent.create = function create(properties) {
                    return new MoveIntent(properties);
                };

                /**
                 * Encodes the specified MoveIntent message. Does not implicitly {@link jrland.world.v1.MoveIntent.verify|verify} messages.
                 * @function encode
                 * @memberof jrland.world.v1.MoveIntent
                 * @static
                 * @param {jrland.world.v1.IMoveIntent} message MoveIntent message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                MoveIntent.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.moveX != null && Object.hasOwnProperty.call(message, "moveX"))
                        writer.uint32(/* id 1, wireType 5 =*/13).float(message.moveX);
                    if (message.moveZ != null && Object.hasOwnProperty.call(message, "moveZ"))
                        writer.uint32(/* id 2, wireType 5 =*/21).float(message.moveZ);
                    if (message.sprint != null && Object.hasOwnProperty.call(message, "sprint"))
                        writer.uint32(/* id 3, wireType 0 =*/24).bool(message.sprint);
                    if (message.yaw != null && Object.hasOwnProperty.call(message, "yaw"))
                        writer.uint32(/* id 4, wireType 5 =*/37).float(message.yaw);
                    return writer;
                };

                /**
                 * Encodes the specified MoveIntent message, length delimited. Does not implicitly {@link jrland.world.v1.MoveIntent.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof jrland.world.v1.MoveIntent
                 * @static
                 * @param {jrland.world.v1.IMoveIntent} message MoveIntent message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                MoveIntent.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a MoveIntent message from the specified reader or buffer.
                 * @function decode
                 * @memberof jrland.world.v1.MoveIntent
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jrland.world.v1.MoveIntent} MoveIntent
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                MoveIntent.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.jrland.world.v1.MoveIntent();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.moveX = reader.float();
                                break;
                            }
                        case 2: {
                                message.moveZ = reader.float();
                                break;
                            }
                        case 3: {
                                message.sprint = reader.bool();
                                break;
                            }
                        case 4: {
                                message.yaw = reader.float();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a MoveIntent message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof jrland.world.v1.MoveIntent
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {jrland.world.v1.MoveIntent} MoveIntent
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                MoveIntent.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a MoveIntent message.
                 * @function verify
                 * @memberof jrland.world.v1.MoveIntent
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                MoveIntent.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.moveX != null && message.hasOwnProperty("moveX"))
                        if (typeof message.moveX !== "number")
                            return "moveX: number expected";
                    if (message.moveZ != null && message.hasOwnProperty("moveZ"))
                        if (typeof message.moveZ !== "number")
                            return "moveZ: number expected";
                    if (message.sprint != null && message.hasOwnProperty("sprint"))
                        if (typeof message.sprint !== "boolean")
                            return "sprint: boolean expected";
                    if (message.yaw != null && message.hasOwnProperty("yaw"))
                        if (typeof message.yaw !== "number")
                            return "yaw: number expected";
                    return null;
                };

                /**
                 * Creates a MoveIntent message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof jrland.world.v1.MoveIntent
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {jrland.world.v1.MoveIntent} MoveIntent
                 */
                MoveIntent.fromObject = function fromObject(object) {
                    if (object instanceof $root.jrland.world.v1.MoveIntent)
                        return object;
                    let message = new $root.jrland.world.v1.MoveIntent();
                    if (object.moveX != null)
                        message.moveX = Number(object.moveX);
                    if (object.moveZ != null)
                        message.moveZ = Number(object.moveZ);
                    if (object.sprint != null)
                        message.sprint = Boolean(object.sprint);
                    if (object.yaw != null)
                        message.yaw = Number(object.yaw);
                    return message;
                };

                /**
                 * Creates a plain object from a MoveIntent message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof jrland.world.v1.MoveIntent
                 * @static
                 * @param {jrland.world.v1.MoveIntent} message MoveIntent
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                MoveIntent.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.moveX = 0;
                        object.moveZ = 0;
                        object.sprint = false;
                        object.yaw = 0;
                    }
                    if (message.moveX != null && message.hasOwnProperty("moveX"))
                        object.moveX = options.json && !isFinite(message.moveX) ? String(message.moveX) : message.moveX;
                    if (message.moveZ != null && message.hasOwnProperty("moveZ"))
                        object.moveZ = options.json && !isFinite(message.moveZ) ? String(message.moveZ) : message.moveZ;
                    if (message.sprint != null && message.hasOwnProperty("sprint"))
                        object.sprint = message.sprint;
                    if (message.yaw != null && message.hasOwnProperty("yaw"))
                        object.yaw = options.json && !isFinite(message.yaw) ? String(message.yaw) : message.yaw;
                    return object;
                };

                /**
                 * Converts this MoveIntent to JSON.
                 * @function toJSON
                 * @memberof jrland.world.v1.MoveIntent
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                MoveIntent.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for MoveIntent
                 * @function getTypeUrl
                 * @memberof jrland.world.v1.MoveIntent
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                MoveIntent.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/jrland.world.v1.MoveIntent";
                };

                return MoveIntent;
            })();

            v1.InputFrame = (function() {

                /**
                 * Properties of an InputFrame.
                 * @memberof jrland.world.v1
                 * @interface IInputFrame
                 * @property {jrland.world.v1.IMoveIntent|null} [move] InputFrame move
                 */

                /**
                 * Constructs a new InputFrame.
                 * @memberof jrland.world.v1
                 * @classdesc Represents an InputFrame.
                 * @implements IInputFrame
                 * @constructor
                 * @param {jrland.world.v1.IInputFrame=} [properties] Properties to set
                 */
                function InputFrame(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * InputFrame move.
                 * @member {jrland.world.v1.IMoveIntent|null|undefined} move
                 * @memberof jrland.world.v1.InputFrame
                 * @instance
                 */
                InputFrame.prototype.move = null;

                /**
                 * Creates a new InputFrame instance using the specified properties.
                 * @function create
                 * @memberof jrland.world.v1.InputFrame
                 * @static
                 * @param {jrland.world.v1.IInputFrame=} [properties] Properties to set
                 * @returns {jrland.world.v1.InputFrame} InputFrame instance
                 */
                InputFrame.create = function create(properties) {
                    return new InputFrame(properties);
                };

                /**
                 * Encodes the specified InputFrame message. Does not implicitly {@link jrland.world.v1.InputFrame.verify|verify} messages.
                 * @function encode
                 * @memberof jrland.world.v1.InputFrame
                 * @static
                 * @param {jrland.world.v1.IInputFrame} message InputFrame message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InputFrame.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.move != null && Object.hasOwnProperty.call(message, "move"))
                        $root.jrland.world.v1.MoveIntent.encode(message.move, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified InputFrame message, length delimited. Does not implicitly {@link jrland.world.v1.InputFrame.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof jrland.world.v1.InputFrame
                 * @static
                 * @param {jrland.world.v1.IInputFrame} message InputFrame message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InputFrame.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an InputFrame message from the specified reader or buffer.
                 * @function decode
                 * @memberof jrland.world.v1.InputFrame
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jrland.world.v1.InputFrame} InputFrame
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                InputFrame.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.jrland.world.v1.InputFrame();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.move = $root.jrland.world.v1.MoveIntent.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an InputFrame message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof jrland.world.v1.InputFrame
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {jrland.world.v1.InputFrame} InputFrame
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                InputFrame.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an InputFrame message.
                 * @function verify
                 * @memberof jrland.world.v1.InputFrame
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                InputFrame.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.move != null && message.hasOwnProperty("move")) {
                        let error = $root.jrland.world.v1.MoveIntent.verify(message.move);
                        if (error)
                            return "move." + error;
                    }
                    return null;
                };

                /**
                 * Creates an InputFrame message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof jrland.world.v1.InputFrame
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {jrland.world.v1.InputFrame} InputFrame
                 */
                InputFrame.fromObject = function fromObject(object) {
                    if (object instanceof $root.jrland.world.v1.InputFrame)
                        return object;
                    let message = new $root.jrland.world.v1.InputFrame();
                    if (object.move != null) {
                        if (typeof object.move !== "object")
                            throw TypeError(".jrland.world.v1.InputFrame.move: object expected");
                        message.move = $root.jrland.world.v1.MoveIntent.fromObject(object.move);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from an InputFrame message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof jrland.world.v1.InputFrame
                 * @static
                 * @param {jrland.world.v1.InputFrame} message InputFrame
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                InputFrame.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults)
                        object.move = null;
                    if (message.move != null && message.hasOwnProperty("move"))
                        object.move = $root.jrland.world.v1.MoveIntent.toObject(message.move, options);
                    return object;
                };

                /**
                 * Converts this InputFrame to JSON.
                 * @function toJSON
                 * @memberof jrland.world.v1.InputFrame
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                InputFrame.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for InputFrame
                 * @function getTypeUrl
                 * @memberof jrland.world.v1.InputFrame
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                InputFrame.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/jrland.world.v1.InputFrame";
                };

                return InputFrame;
            })();

            v1.MineCommand = (function() {

                /**
                 * Properties of a MineCommand.
                 * @memberof jrland.world.v1
                 * @interface IMineCommand
                 * @property {number|null} [x] MineCommand x
                 * @property {number|null} [y] MineCommand y
                 * @property {number|null} [z] MineCommand z
                 */

                /**
                 * Constructs a new MineCommand.
                 * @memberof jrland.world.v1
                 * @classdesc Represents a MineCommand.
                 * @implements IMineCommand
                 * @constructor
                 * @param {jrland.world.v1.IMineCommand=} [properties] Properties to set
                 */
                function MineCommand(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * MineCommand x.
                 * @member {number} x
                 * @memberof jrland.world.v1.MineCommand
                 * @instance
                 */
                MineCommand.prototype.x = 0;

                /**
                 * MineCommand y.
                 * @member {number} y
                 * @memberof jrland.world.v1.MineCommand
                 * @instance
                 */
                MineCommand.prototype.y = 0;

                /**
                 * MineCommand z.
                 * @member {number} z
                 * @memberof jrland.world.v1.MineCommand
                 * @instance
                 */
                MineCommand.prototype.z = 0;

                /**
                 * Creates a new MineCommand instance using the specified properties.
                 * @function create
                 * @memberof jrland.world.v1.MineCommand
                 * @static
                 * @param {jrland.world.v1.IMineCommand=} [properties] Properties to set
                 * @returns {jrland.world.v1.MineCommand} MineCommand instance
                 */
                MineCommand.create = function create(properties) {
                    return new MineCommand(properties);
                };

                /**
                 * Encodes the specified MineCommand message. Does not implicitly {@link jrland.world.v1.MineCommand.verify|verify} messages.
                 * @function encode
                 * @memberof jrland.world.v1.MineCommand
                 * @static
                 * @param {jrland.world.v1.IMineCommand} message MineCommand message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                MineCommand.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.x);
                    if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.y);
                    if (message.z != null && Object.hasOwnProperty.call(message, "z"))
                        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.z);
                    return writer;
                };

                /**
                 * Encodes the specified MineCommand message, length delimited. Does not implicitly {@link jrland.world.v1.MineCommand.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof jrland.world.v1.MineCommand
                 * @static
                 * @param {jrland.world.v1.IMineCommand} message MineCommand message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                MineCommand.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a MineCommand message from the specified reader or buffer.
                 * @function decode
                 * @memberof jrland.world.v1.MineCommand
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jrland.world.v1.MineCommand} MineCommand
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                MineCommand.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.jrland.world.v1.MineCommand();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.x = reader.int32();
                                break;
                            }
                        case 2: {
                                message.y = reader.int32();
                                break;
                            }
                        case 3: {
                                message.z = reader.int32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a MineCommand message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof jrland.world.v1.MineCommand
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {jrland.world.v1.MineCommand} MineCommand
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                MineCommand.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a MineCommand message.
                 * @function verify
                 * @memberof jrland.world.v1.MineCommand
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                MineCommand.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.x != null && message.hasOwnProperty("x"))
                        if (!$util.isInteger(message.x))
                            return "x: integer expected";
                    if (message.y != null && message.hasOwnProperty("y"))
                        if (!$util.isInteger(message.y))
                            return "y: integer expected";
                    if (message.z != null && message.hasOwnProperty("z"))
                        if (!$util.isInteger(message.z))
                            return "z: integer expected";
                    return null;
                };

                /**
                 * Creates a MineCommand message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof jrland.world.v1.MineCommand
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {jrland.world.v1.MineCommand} MineCommand
                 */
                MineCommand.fromObject = function fromObject(object) {
                    if (object instanceof $root.jrland.world.v1.MineCommand)
                        return object;
                    let message = new $root.jrland.world.v1.MineCommand();
                    if (object.x != null)
                        message.x = object.x | 0;
                    if (object.y != null)
                        message.y = object.y | 0;
                    if (object.z != null)
                        message.z = object.z | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a MineCommand message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof jrland.world.v1.MineCommand
                 * @static
                 * @param {jrland.world.v1.MineCommand} message MineCommand
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                MineCommand.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.x = 0;
                        object.y = 0;
                        object.z = 0;
                    }
                    if (message.x != null && message.hasOwnProperty("x"))
                        object.x = message.x;
                    if (message.y != null && message.hasOwnProperty("y"))
                        object.y = message.y;
                    if (message.z != null && message.hasOwnProperty("z"))
                        object.z = message.z;
                    return object;
                };

                /**
                 * Converts this MineCommand to JSON.
                 * @function toJSON
                 * @memberof jrland.world.v1.MineCommand
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                MineCommand.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for MineCommand
                 * @function getTypeUrl
                 * @memberof jrland.world.v1.MineCommand
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                MineCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/jrland.world.v1.MineCommand";
                };

                return MineCommand;
            })();

            v1.BuildCommand = (function() {

                /**
                 * Properties of a BuildCommand.
                 * @memberof jrland.world.v1
                 * @interface IBuildCommand
                 * @property {number|null} [x] BuildCommand x
                 * @property {number|null} [y] BuildCommand y
                 * @property {number|null} [z] BuildCommand z
                 * @property {number|null} [blockType] BuildCommand blockType
                 */

                /**
                 * Constructs a new BuildCommand.
                 * @memberof jrland.world.v1
                 * @classdesc Represents a BuildCommand.
                 * @implements IBuildCommand
                 * @constructor
                 * @param {jrland.world.v1.IBuildCommand=} [properties] Properties to set
                 */
                function BuildCommand(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * BuildCommand x.
                 * @member {number} x
                 * @memberof jrland.world.v1.BuildCommand
                 * @instance
                 */
                BuildCommand.prototype.x = 0;

                /**
                 * BuildCommand y.
                 * @member {number} y
                 * @memberof jrland.world.v1.BuildCommand
                 * @instance
                 */
                BuildCommand.prototype.y = 0;

                /**
                 * BuildCommand z.
                 * @member {number} z
                 * @memberof jrland.world.v1.BuildCommand
                 * @instance
                 */
                BuildCommand.prototype.z = 0;

                /**
                 * BuildCommand blockType.
                 * @member {number} blockType
                 * @memberof jrland.world.v1.BuildCommand
                 * @instance
                 */
                BuildCommand.prototype.blockType = 0;

                /**
                 * Creates a new BuildCommand instance using the specified properties.
                 * @function create
                 * @memberof jrland.world.v1.BuildCommand
                 * @static
                 * @param {jrland.world.v1.IBuildCommand=} [properties] Properties to set
                 * @returns {jrland.world.v1.BuildCommand} BuildCommand instance
                 */
                BuildCommand.create = function create(properties) {
                    return new BuildCommand(properties);
                };

                /**
                 * Encodes the specified BuildCommand message. Does not implicitly {@link jrland.world.v1.BuildCommand.verify|verify} messages.
                 * @function encode
                 * @memberof jrland.world.v1.BuildCommand
                 * @static
                 * @param {jrland.world.v1.IBuildCommand} message BuildCommand message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                BuildCommand.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.x);
                    if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.y);
                    if (message.z != null && Object.hasOwnProperty.call(message, "z"))
                        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.z);
                    if (message.blockType != null && Object.hasOwnProperty.call(message, "blockType"))
                        writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.blockType);
                    return writer;
                };

                /**
                 * Encodes the specified BuildCommand message, length delimited. Does not implicitly {@link jrland.world.v1.BuildCommand.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof jrland.world.v1.BuildCommand
                 * @static
                 * @param {jrland.world.v1.IBuildCommand} message BuildCommand message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                BuildCommand.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a BuildCommand message from the specified reader or buffer.
                 * @function decode
                 * @memberof jrland.world.v1.BuildCommand
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jrland.world.v1.BuildCommand} BuildCommand
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                BuildCommand.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.jrland.world.v1.BuildCommand();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.x = reader.int32();
                                break;
                            }
                        case 2: {
                                message.y = reader.int32();
                                break;
                            }
                        case 3: {
                                message.z = reader.int32();
                                break;
                            }
                        case 4: {
                                message.blockType = reader.uint32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a BuildCommand message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof jrland.world.v1.BuildCommand
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {jrland.world.v1.BuildCommand} BuildCommand
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                BuildCommand.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a BuildCommand message.
                 * @function verify
                 * @memberof jrland.world.v1.BuildCommand
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                BuildCommand.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.x != null && message.hasOwnProperty("x"))
                        if (!$util.isInteger(message.x))
                            return "x: integer expected";
                    if (message.y != null && message.hasOwnProperty("y"))
                        if (!$util.isInteger(message.y))
                            return "y: integer expected";
                    if (message.z != null && message.hasOwnProperty("z"))
                        if (!$util.isInteger(message.z))
                            return "z: integer expected";
                    if (message.blockType != null && message.hasOwnProperty("blockType"))
                        if (!$util.isInteger(message.blockType))
                            return "blockType: integer expected";
                    return null;
                };

                /**
                 * Creates a BuildCommand message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof jrland.world.v1.BuildCommand
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {jrland.world.v1.BuildCommand} BuildCommand
                 */
                BuildCommand.fromObject = function fromObject(object) {
                    if (object instanceof $root.jrland.world.v1.BuildCommand)
                        return object;
                    let message = new $root.jrland.world.v1.BuildCommand();
                    if (object.x != null)
                        message.x = object.x | 0;
                    if (object.y != null)
                        message.y = object.y | 0;
                    if (object.z != null)
                        message.z = object.z | 0;
                    if (object.blockType != null)
                        message.blockType = object.blockType >>> 0;
                    return message;
                };

                /**
                 * Creates a plain object from a BuildCommand message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof jrland.world.v1.BuildCommand
                 * @static
                 * @param {jrland.world.v1.BuildCommand} message BuildCommand
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                BuildCommand.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.x = 0;
                        object.y = 0;
                        object.z = 0;
                        object.blockType = 0;
                    }
                    if (message.x != null && message.hasOwnProperty("x"))
                        object.x = message.x;
                    if (message.y != null && message.hasOwnProperty("y"))
                        object.y = message.y;
                    if (message.z != null && message.hasOwnProperty("z"))
                        object.z = message.z;
                    if (message.blockType != null && message.hasOwnProperty("blockType"))
                        object.blockType = message.blockType;
                    return object;
                };

                /**
                 * Converts this BuildCommand to JSON.
                 * @function toJSON
                 * @memberof jrland.world.v1.BuildCommand
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                BuildCommand.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for BuildCommand
                 * @function getTypeUrl
                 * @memberof jrland.world.v1.BuildCommand
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                BuildCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/jrland.world.v1.BuildCommand";
                };

                return BuildCommand;
            })();

            v1.CraftCommand = (function() {

                /**
                 * Properties of a CraftCommand.
                 * @memberof jrland.world.v1
                 * @interface ICraftCommand
                 * @property {string|null} [recipeId] CraftCommand recipeId
                 */

                /**
                 * Constructs a new CraftCommand.
                 * @memberof jrland.world.v1
                 * @classdesc Represents a CraftCommand.
                 * @implements ICraftCommand
                 * @constructor
                 * @param {jrland.world.v1.ICraftCommand=} [properties] Properties to set
                 */
                function CraftCommand(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * CraftCommand recipeId.
                 * @member {string} recipeId
                 * @memberof jrland.world.v1.CraftCommand
                 * @instance
                 */
                CraftCommand.prototype.recipeId = "";

                /**
                 * Creates a new CraftCommand instance using the specified properties.
                 * @function create
                 * @memberof jrland.world.v1.CraftCommand
                 * @static
                 * @param {jrland.world.v1.ICraftCommand=} [properties] Properties to set
                 * @returns {jrland.world.v1.CraftCommand} CraftCommand instance
                 */
                CraftCommand.create = function create(properties) {
                    return new CraftCommand(properties);
                };

                /**
                 * Encodes the specified CraftCommand message. Does not implicitly {@link jrland.world.v1.CraftCommand.verify|verify} messages.
                 * @function encode
                 * @memberof jrland.world.v1.CraftCommand
                 * @static
                 * @param {jrland.world.v1.ICraftCommand} message CraftCommand message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CraftCommand.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.recipeId != null && Object.hasOwnProperty.call(message, "recipeId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.recipeId);
                    return writer;
                };

                /**
                 * Encodes the specified CraftCommand message, length delimited. Does not implicitly {@link jrland.world.v1.CraftCommand.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof jrland.world.v1.CraftCommand
                 * @static
                 * @param {jrland.world.v1.ICraftCommand} message CraftCommand message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CraftCommand.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a CraftCommand message from the specified reader or buffer.
                 * @function decode
                 * @memberof jrland.world.v1.CraftCommand
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jrland.world.v1.CraftCommand} CraftCommand
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CraftCommand.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.jrland.world.v1.CraftCommand();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.recipeId = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a CraftCommand message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof jrland.world.v1.CraftCommand
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {jrland.world.v1.CraftCommand} CraftCommand
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CraftCommand.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a CraftCommand message.
                 * @function verify
                 * @memberof jrland.world.v1.CraftCommand
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                CraftCommand.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.recipeId != null && message.hasOwnProperty("recipeId"))
                        if (!$util.isString(message.recipeId))
                            return "recipeId: string expected";
                    return null;
                };

                /**
                 * Creates a CraftCommand message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof jrland.world.v1.CraftCommand
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {jrland.world.v1.CraftCommand} CraftCommand
                 */
                CraftCommand.fromObject = function fromObject(object) {
                    if (object instanceof $root.jrland.world.v1.CraftCommand)
                        return object;
                    let message = new $root.jrland.world.v1.CraftCommand();
                    if (object.recipeId != null)
                        message.recipeId = String(object.recipeId);
                    return message;
                };

                /**
                 * Creates a plain object from a CraftCommand message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof jrland.world.v1.CraftCommand
                 * @static
                 * @param {jrland.world.v1.CraftCommand} message CraftCommand
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                CraftCommand.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults)
                        object.recipeId = "";
                    if (message.recipeId != null && message.hasOwnProperty("recipeId"))
                        object.recipeId = message.recipeId;
                    return object;
                };

                /**
                 * Converts this CraftCommand to JSON.
                 * @function toJSON
                 * @memberof jrland.world.v1.CraftCommand
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                CraftCommand.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for CraftCommand
                 * @function getTypeUrl
                 * @memberof jrland.world.v1.CraftCommand
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                CraftCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/jrland.world.v1.CraftCommand";
                };

                return CraftCommand;
            })();

            v1.UseCommand = (function() {

                /**
                 * Properties of a UseCommand.
                 * @memberof jrland.world.v1
                 * @interface IUseCommand
                 * @property {string|null} [itemId] UseCommand itemId
                 */

                /**
                 * Constructs a new UseCommand.
                 * @memberof jrland.world.v1
                 * @classdesc Represents a UseCommand.
                 * @implements IUseCommand
                 * @constructor
                 * @param {jrland.world.v1.IUseCommand=} [properties] Properties to set
                 */
                function UseCommand(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * UseCommand itemId.
                 * @member {string} itemId
                 * @memberof jrland.world.v1.UseCommand
                 * @instance
                 */
                UseCommand.prototype.itemId = "";

                /**
                 * Creates a new UseCommand instance using the specified properties.
                 * @function create
                 * @memberof jrland.world.v1.UseCommand
                 * @static
                 * @param {jrland.world.v1.IUseCommand=} [properties] Properties to set
                 * @returns {jrland.world.v1.UseCommand} UseCommand instance
                 */
                UseCommand.create = function create(properties) {
                    return new UseCommand(properties);
                };

                /**
                 * Encodes the specified UseCommand message. Does not implicitly {@link jrland.world.v1.UseCommand.verify|verify} messages.
                 * @function encode
                 * @memberof jrland.world.v1.UseCommand
                 * @static
                 * @param {jrland.world.v1.IUseCommand} message UseCommand message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                UseCommand.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.itemId != null && Object.hasOwnProperty.call(message, "itemId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.itemId);
                    return writer;
                };

                /**
                 * Encodes the specified UseCommand message, length delimited. Does not implicitly {@link jrland.world.v1.UseCommand.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof jrland.world.v1.UseCommand
                 * @static
                 * @param {jrland.world.v1.IUseCommand} message UseCommand message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                UseCommand.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a UseCommand message from the specified reader or buffer.
                 * @function decode
                 * @memberof jrland.world.v1.UseCommand
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jrland.world.v1.UseCommand} UseCommand
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                UseCommand.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.jrland.world.v1.UseCommand();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.itemId = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a UseCommand message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof jrland.world.v1.UseCommand
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {jrland.world.v1.UseCommand} UseCommand
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                UseCommand.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a UseCommand message.
                 * @function verify
                 * @memberof jrland.world.v1.UseCommand
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                UseCommand.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.itemId != null && message.hasOwnProperty("itemId"))
                        if (!$util.isString(message.itemId))
                            return "itemId: string expected";
                    return null;
                };

                /**
                 * Creates a UseCommand message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof jrland.world.v1.UseCommand
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {jrland.world.v1.UseCommand} UseCommand
                 */
                UseCommand.fromObject = function fromObject(object) {
                    if (object instanceof $root.jrland.world.v1.UseCommand)
                        return object;
                    let message = new $root.jrland.world.v1.UseCommand();
                    if (object.itemId != null)
                        message.itemId = String(object.itemId);
                    return message;
                };

                /**
                 * Creates a plain object from a UseCommand message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof jrland.world.v1.UseCommand
                 * @static
                 * @param {jrland.world.v1.UseCommand} message UseCommand
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                UseCommand.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults)
                        object.itemId = "";
                    if (message.itemId != null && message.hasOwnProperty("itemId"))
                        object.itemId = message.itemId;
                    return object;
                };

                /**
                 * Converts this UseCommand to JSON.
                 * @function toJSON
                 * @memberof jrland.world.v1.UseCommand
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                UseCommand.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for UseCommand
                 * @function getTypeUrl
                 * @memberof jrland.world.v1.UseCommand
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                UseCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/jrland.world.v1.UseCommand";
                };

                return UseCommand;
            })();

            v1.ChatLocalMessage = (function() {

                /**
                 * Properties of a ChatLocalMessage.
                 * @memberof jrland.world.v1
                 * @interface IChatLocalMessage
                 * @property {string|null} [text] ChatLocalMessage text
                 */

                /**
                 * Constructs a new ChatLocalMessage.
                 * @memberof jrland.world.v1
                 * @classdesc Represents a ChatLocalMessage.
                 * @implements IChatLocalMessage
                 * @constructor
                 * @param {jrland.world.v1.IChatLocalMessage=} [properties] Properties to set
                 */
                function ChatLocalMessage(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ChatLocalMessage text.
                 * @member {string} text
                 * @memberof jrland.world.v1.ChatLocalMessage
                 * @instance
                 */
                ChatLocalMessage.prototype.text = "";

                /**
                 * Creates a new ChatLocalMessage instance using the specified properties.
                 * @function create
                 * @memberof jrland.world.v1.ChatLocalMessage
                 * @static
                 * @param {jrland.world.v1.IChatLocalMessage=} [properties] Properties to set
                 * @returns {jrland.world.v1.ChatLocalMessage} ChatLocalMessage instance
                 */
                ChatLocalMessage.create = function create(properties) {
                    return new ChatLocalMessage(properties);
                };

                /**
                 * Encodes the specified ChatLocalMessage message. Does not implicitly {@link jrland.world.v1.ChatLocalMessage.verify|verify} messages.
                 * @function encode
                 * @memberof jrland.world.v1.ChatLocalMessage
                 * @static
                 * @param {jrland.world.v1.IChatLocalMessage} message ChatLocalMessage message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ChatLocalMessage.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.text);
                    return writer;
                };

                /**
                 * Encodes the specified ChatLocalMessage message, length delimited. Does not implicitly {@link jrland.world.v1.ChatLocalMessage.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof jrland.world.v1.ChatLocalMessage
                 * @static
                 * @param {jrland.world.v1.IChatLocalMessage} message ChatLocalMessage message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ChatLocalMessage.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ChatLocalMessage message from the specified reader or buffer.
                 * @function decode
                 * @memberof jrland.world.v1.ChatLocalMessage
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jrland.world.v1.ChatLocalMessage} ChatLocalMessage
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ChatLocalMessage.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.jrland.world.v1.ChatLocalMessage();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.text = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ChatLocalMessage message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof jrland.world.v1.ChatLocalMessage
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {jrland.world.v1.ChatLocalMessage} ChatLocalMessage
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ChatLocalMessage.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ChatLocalMessage message.
                 * @function verify
                 * @memberof jrland.world.v1.ChatLocalMessage
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ChatLocalMessage.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.text != null && message.hasOwnProperty("text"))
                        if (!$util.isString(message.text))
                            return "text: string expected";
                    return null;
                };

                /**
                 * Creates a ChatLocalMessage message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof jrland.world.v1.ChatLocalMessage
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {jrland.world.v1.ChatLocalMessage} ChatLocalMessage
                 */
                ChatLocalMessage.fromObject = function fromObject(object) {
                    if (object instanceof $root.jrland.world.v1.ChatLocalMessage)
                        return object;
                    let message = new $root.jrland.world.v1.ChatLocalMessage();
                    if (object.text != null)
                        message.text = String(object.text);
                    return message;
                };

                /**
                 * Creates a plain object from a ChatLocalMessage message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof jrland.world.v1.ChatLocalMessage
                 * @static
                 * @param {jrland.world.v1.ChatLocalMessage} message ChatLocalMessage
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ChatLocalMessage.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults)
                        object.text = "";
                    if (message.text != null && message.hasOwnProperty("text"))
                        object.text = message.text;
                    return object;
                };

                /**
                 * Converts this ChatLocalMessage to JSON.
                 * @function toJSON
                 * @memberof jrland.world.v1.ChatLocalMessage
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ChatLocalMessage.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ChatLocalMessage
                 * @function getTypeUrl
                 * @memberof jrland.world.v1.ChatLocalMessage
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ChatLocalMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/jrland.world.v1.ChatLocalMessage";
                };

                return ChatLocalMessage;
            })();

            v1.ClientEnvelope = (function() {

                /**
                 * Properties of a ClientEnvelope.
                 * @memberof jrland.world.v1
                 * @interface IClientEnvelope
                 * @property {string|null} [sessionId] ClientEnvelope sessionId
                 * @property {number|null} [seq] ClientEnvelope seq
                 * @property {number|Long|null} [clientTimeMs] ClientEnvelope clientTimeMs
                 * @property {jrland.world.v1.IClientHello|null} [hello] ClientEnvelope hello
                 * @property {jrland.world.v1.IInputFrame|null} [inputFrame] ClientEnvelope inputFrame
                 * @property {jrland.world.v1.IMineCommand|null} [mineCommand] ClientEnvelope mineCommand
                 * @property {jrland.world.v1.IBuildCommand|null} [buildCommand] ClientEnvelope buildCommand
                 * @property {jrland.world.v1.ICraftCommand|null} [craftCommand] ClientEnvelope craftCommand
                 * @property {jrland.world.v1.IUseCommand|null} [useCommand] ClientEnvelope useCommand
                 * @property {jrland.world.v1.IChatLocalMessage|null} [chatLocal] ClientEnvelope chatLocal
                 * @property {jrland.world.v1.IAck|null} [ack] ClientEnvelope ack
                 */

                /**
                 * Constructs a new ClientEnvelope.
                 * @memberof jrland.world.v1
                 * @classdesc Represents a ClientEnvelope.
                 * @implements IClientEnvelope
                 * @constructor
                 * @param {jrland.world.v1.IClientEnvelope=} [properties] Properties to set
                 */
                function ClientEnvelope(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ClientEnvelope sessionId.
                 * @member {string} sessionId
                 * @memberof jrland.world.v1.ClientEnvelope
                 * @instance
                 */
                ClientEnvelope.prototype.sessionId = "";

                /**
                 * ClientEnvelope seq.
                 * @member {number} seq
                 * @memberof jrland.world.v1.ClientEnvelope
                 * @instance
                 */
                ClientEnvelope.prototype.seq = 0;

                /**
                 * ClientEnvelope clientTimeMs.
                 * @member {number|Long} clientTimeMs
                 * @memberof jrland.world.v1.ClientEnvelope
                 * @instance
                 */
                ClientEnvelope.prototype.clientTimeMs = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * ClientEnvelope hello.
                 * @member {jrland.world.v1.IClientHello|null|undefined} hello
                 * @memberof jrland.world.v1.ClientEnvelope
                 * @instance
                 */
                ClientEnvelope.prototype.hello = null;

                /**
                 * ClientEnvelope inputFrame.
                 * @member {jrland.world.v1.IInputFrame|null|undefined} inputFrame
                 * @memberof jrland.world.v1.ClientEnvelope
                 * @instance
                 */
                ClientEnvelope.prototype.inputFrame = null;

                /**
                 * ClientEnvelope mineCommand.
                 * @member {jrland.world.v1.IMineCommand|null|undefined} mineCommand
                 * @memberof jrland.world.v1.ClientEnvelope
                 * @instance
                 */
                ClientEnvelope.prototype.mineCommand = null;

                /**
                 * ClientEnvelope buildCommand.
                 * @member {jrland.world.v1.IBuildCommand|null|undefined} buildCommand
                 * @memberof jrland.world.v1.ClientEnvelope
                 * @instance
                 */
                ClientEnvelope.prototype.buildCommand = null;

                /**
                 * ClientEnvelope craftCommand.
                 * @member {jrland.world.v1.ICraftCommand|null|undefined} craftCommand
                 * @memberof jrland.world.v1.ClientEnvelope
                 * @instance
                 */
                ClientEnvelope.prototype.craftCommand = null;

                /**
                 * ClientEnvelope useCommand.
                 * @member {jrland.world.v1.IUseCommand|null|undefined} useCommand
                 * @memberof jrland.world.v1.ClientEnvelope
                 * @instance
                 */
                ClientEnvelope.prototype.useCommand = null;

                /**
                 * ClientEnvelope chatLocal.
                 * @member {jrland.world.v1.IChatLocalMessage|null|undefined} chatLocal
                 * @memberof jrland.world.v1.ClientEnvelope
                 * @instance
                 */
                ClientEnvelope.prototype.chatLocal = null;

                /**
                 * ClientEnvelope ack.
                 * @member {jrland.world.v1.IAck|null|undefined} ack
                 * @memberof jrland.world.v1.ClientEnvelope
                 * @instance
                 */
                ClientEnvelope.prototype.ack = null;

                // OneOf field names bound to virtual getters and setters
                let $oneOfFields;

                /**
                 * ClientEnvelope payload.
                 * @member {"hello"|"inputFrame"|"mineCommand"|"buildCommand"|"craftCommand"|"useCommand"|"chatLocal"|"ack"|undefined} payload
                 * @memberof jrland.world.v1.ClientEnvelope
                 * @instance
                 */
                Object.defineProperty(ClientEnvelope.prototype, "payload", {
                    get: $util.oneOfGetter($oneOfFields = ["hello", "inputFrame", "mineCommand", "buildCommand", "craftCommand", "useCommand", "chatLocal", "ack"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new ClientEnvelope instance using the specified properties.
                 * @function create
                 * @memberof jrland.world.v1.ClientEnvelope
                 * @static
                 * @param {jrland.world.v1.IClientEnvelope=} [properties] Properties to set
                 * @returns {jrland.world.v1.ClientEnvelope} ClientEnvelope instance
                 */
                ClientEnvelope.create = function create(properties) {
                    return new ClientEnvelope(properties);
                };

                /**
                 * Encodes the specified ClientEnvelope message. Does not implicitly {@link jrland.world.v1.ClientEnvelope.verify|verify} messages.
                 * @function encode
                 * @memberof jrland.world.v1.ClientEnvelope
                 * @static
                 * @param {jrland.world.v1.IClientEnvelope} message ClientEnvelope message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ClientEnvelope.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.sessionId != null && Object.hasOwnProperty.call(message, "sessionId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.sessionId);
                    if (message.seq != null && Object.hasOwnProperty.call(message, "seq"))
                        writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.seq);
                    if (message.clientTimeMs != null && Object.hasOwnProperty.call(message, "clientTimeMs"))
                        writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.clientTimeMs);
                    if (message.hello != null && Object.hasOwnProperty.call(message, "hello"))
                        $root.jrland.world.v1.ClientHello.encode(message.hello, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
                    if (message.inputFrame != null && Object.hasOwnProperty.call(message, "inputFrame"))
                        $root.jrland.world.v1.InputFrame.encode(message.inputFrame, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
                    if (message.mineCommand != null && Object.hasOwnProperty.call(message, "mineCommand"))
                        $root.jrland.world.v1.MineCommand.encode(message.mineCommand, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
                    if (message.buildCommand != null && Object.hasOwnProperty.call(message, "buildCommand"))
                        $root.jrland.world.v1.BuildCommand.encode(message.buildCommand, writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
                    if (message.craftCommand != null && Object.hasOwnProperty.call(message, "craftCommand"))
                        $root.jrland.world.v1.CraftCommand.encode(message.craftCommand, writer.uint32(/* id 14, wireType 2 =*/114).fork()).ldelim();
                    if (message.useCommand != null && Object.hasOwnProperty.call(message, "useCommand"))
                        $root.jrland.world.v1.UseCommand.encode(message.useCommand, writer.uint32(/* id 15, wireType 2 =*/122).fork()).ldelim();
                    if (message.chatLocal != null && Object.hasOwnProperty.call(message, "chatLocal"))
                        $root.jrland.world.v1.ChatLocalMessage.encode(message.chatLocal, writer.uint32(/* id 16, wireType 2 =*/130).fork()).ldelim();
                    if (message.ack != null && Object.hasOwnProperty.call(message, "ack"))
                        $root.jrland.world.v1.Ack.encode(message.ack, writer.uint32(/* id 17, wireType 2 =*/138).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified ClientEnvelope message, length delimited. Does not implicitly {@link jrland.world.v1.ClientEnvelope.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof jrland.world.v1.ClientEnvelope
                 * @static
                 * @param {jrland.world.v1.IClientEnvelope} message ClientEnvelope message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ClientEnvelope.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ClientEnvelope message from the specified reader or buffer.
                 * @function decode
                 * @memberof jrland.world.v1.ClientEnvelope
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jrland.world.v1.ClientEnvelope} ClientEnvelope
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ClientEnvelope.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.jrland.world.v1.ClientEnvelope();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.sessionId = reader.string();
                                break;
                            }
                        case 2: {
                                message.seq = reader.uint32();
                                break;
                            }
                        case 3: {
                                message.clientTimeMs = reader.uint64();
                                break;
                            }
                        case 10: {
                                message.hello = $root.jrland.world.v1.ClientHello.decode(reader, reader.uint32());
                                break;
                            }
                        case 11: {
                                message.inputFrame = $root.jrland.world.v1.InputFrame.decode(reader, reader.uint32());
                                break;
                            }
                        case 12: {
                                message.mineCommand = $root.jrland.world.v1.MineCommand.decode(reader, reader.uint32());
                                break;
                            }
                        case 13: {
                                message.buildCommand = $root.jrland.world.v1.BuildCommand.decode(reader, reader.uint32());
                                break;
                            }
                        case 14: {
                                message.craftCommand = $root.jrland.world.v1.CraftCommand.decode(reader, reader.uint32());
                                break;
                            }
                        case 15: {
                                message.useCommand = $root.jrland.world.v1.UseCommand.decode(reader, reader.uint32());
                                break;
                            }
                        case 16: {
                                message.chatLocal = $root.jrland.world.v1.ChatLocalMessage.decode(reader, reader.uint32());
                                break;
                            }
                        case 17: {
                                message.ack = $root.jrland.world.v1.Ack.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ClientEnvelope message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof jrland.world.v1.ClientEnvelope
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {jrland.world.v1.ClientEnvelope} ClientEnvelope
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ClientEnvelope.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ClientEnvelope message.
                 * @function verify
                 * @memberof jrland.world.v1.ClientEnvelope
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ClientEnvelope.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    let properties = {};
                    if (message.sessionId != null && message.hasOwnProperty("sessionId"))
                        if (!$util.isString(message.sessionId))
                            return "sessionId: string expected";
                    if (message.seq != null && message.hasOwnProperty("seq"))
                        if (!$util.isInteger(message.seq))
                            return "seq: integer expected";
                    if (message.clientTimeMs != null && message.hasOwnProperty("clientTimeMs"))
                        if (!$util.isInteger(message.clientTimeMs) && !(message.clientTimeMs && $util.isInteger(message.clientTimeMs.low) && $util.isInteger(message.clientTimeMs.high)))
                            return "clientTimeMs: integer|Long expected";
                    if (message.hello != null && message.hasOwnProperty("hello")) {
                        properties.payload = 1;
                        {
                            let error = $root.jrland.world.v1.ClientHello.verify(message.hello);
                            if (error)
                                return "hello." + error;
                        }
                    }
                    if (message.inputFrame != null && message.hasOwnProperty("inputFrame")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.jrland.world.v1.InputFrame.verify(message.inputFrame);
                            if (error)
                                return "inputFrame." + error;
                        }
                    }
                    if (message.mineCommand != null && message.hasOwnProperty("mineCommand")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.jrland.world.v1.MineCommand.verify(message.mineCommand);
                            if (error)
                                return "mineCommand." + error;
                        }
                    }
                    if (message.buildCommand != null && message.hasOwnProperty("buildCommand")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.jrland.world.v1.BuildCommand.verify(message.buildCommand);
                            if (error)
                                return "buildCommand." + error;
                        }
                    }
                    if (message.craftCommand != null && message.hasOwnProperty("craftCommand")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.jrland.world.v1.CraftCommand.verify(message.craftCommand);
                            if (error)
                                return "craftCommand." + error;
                        }
                    }
                    if (message.useCommand != null && message.hasOwnProperty("useCommand")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.jrland.world.v1.UseCommand.verify(message.useCommand);
                            if (error)
                                return "useCommand." + error;
                        }
                    }
                    if (message.chatLocal != null && message.hasOwnProperty("chatLocal")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.jrland.world.v1.ChatLocalMessage.verify(message.chatLocal);
                            if (error)
                                return "chatLocal." + error;
                        }
                    }
                    if (message.ack != null && message.hasOwnProperty("ack")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.jrland.world.v1.Ack.verify(message.ack);
                            if (error)
                                return "ack." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a ClientEnvelope message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof jrland.world.v1.ClientEnvelope
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {jrland.world.v1.ClientEnvelope} ClientEnvelope
                 */
                ClientEnvelope.fromObject = function fromObject(object) {
                    if (object instanceof $root.jrland.world.v1.ClientEnvelope)
                        return object;
                    let message = new $root.jrland.world.v1.ClientEnvelope();
                    if (object.sessionId != null)
                        message.sessionId = String(object.sessionId);
                    if (object.seq != null)
                        message.seq = object.seq >>> 0;
                    if (object.clientTimeMs != null)
                        if ($util.Long)
                            (message.clientTimeMs = $util.Long.fromValue(object.clientTimeMs)).unsigned = true;
                        else if (typeof object.clientTimeMs === "string")
                            message.clientTimeMs = parseInt(object.clientTimeMs, 10);
                        else if (typeof object.clientTimeMs === "number")
                            message.clientTimeMs = object.clientTimeMs;
                        else if (typeof object.clientTimeMs === "object")
                            message.clientTimeMs = new $util.LongBits(object.clientTimeMs.low >>> 0, object.clientTimeMs.high >>> 0).toNumber(true);
                    if (object.hello != null) {
                        if (typeof object.hello !== "object")
                            throw TypeError(".jrland.world.v1.ClientEnvelope.hello: object expected");
                        message.hello = $root.jrland.world.v1.ClientHello.fromObject(object.hello);
                    }
                    if (object.inputFrame != null) {
                        if (typeof object.inputFrame !== "object")
                            throw TypeError(".jrland.world.v1.ClientEnvelope.inputFrame: object expected");
                        message.inputFrame = $root.jrland.world.v1.InputFrame.fromObject(object.inputFrame);
                    }
                    if (object.mineCommand != null) {
                        if (typeof object.mineCommand !== "object")
                            throw TypeError(".jrland.world.v1.ClientEnvelope.mineCommand: object expected");
                        message.mineCommand = $root.jrland.world.v1.MineCommand.fromObject(object.mineCommand);
                    }
                    if (object.buildCommand != null) {
                        if (typeof object.buildCommand !== "object")
                            throw TypeError(".jrland.world.v1.ClientEnvelope.buildCommand: object expected");
                        message.buildCommand = $root.jrland.world.v1.BuildCommand.fromObject(object.buildCommand);
                    }
                    if (object.craftCommand != null) {
                        if (typeof object.craftCommand !== "object")
                            throw TypeError(".jrland.world.v1.ClientEnvelope.craftCommand: object expected");
                        message.craftCommand = $root.jrland.world.v1.CraftCommand.fromObject(object.craftCommand);
                    }
                    if (object.useCommand != null) {
                        if (typeof object.useCommand !== "object")
                            throw TypeError(".jrland.world.v1.ClientEnvelope.useCommand: object expected");
                        message.useCommand = $root.jrland.world.v1.UseCommand.fromObject(object.useCommand);
                    }
                    if (object.chatLocal != null) {
                        if (typeof object.chatLocal !== "object")
                            throw TypeError(".jrland.world.v1.ClientEnvelope.chatLocal: object expected");
                        message.chatLocal = $root.jrland.world.v1.ChatLocalMessage.fromObject(object.chatLocal);
                    }
                    if (object.ack != null) {
                        if (typeof object.ack !== "object")
                            throw TypeError(".jrland.world.v1.ClientEnvelope.ack: object expected");
                        message.ack = $root.jrland.world.v1.Ack.fromObject(object.ack);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a ClientEnvelope message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof jrland.world.v1.ClientEnvelope
                 * @static
                 * @param {jrland.world.v1.ClientEnvelope} message ClientEnvelope
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ClientEnvelope.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.sessionId = "";
                        object.seq = 0;
                        if ($util.Long) {
                            let long = new $util.Long(0, 0, true);
                            object.clientTimeMs = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.clientTimeMs = options.longs === String ? "0" : 0;
                    }
                    if (message.sessionId != null && message.hasOwnProperty("sessionId"))
                        object.sessionId = message.sessionId;
                    if (message.seq != null && message.hasOwnProperty("seq"))
                        object.seq = message.seq;
                    if (message.clientTimeMs != null && message.hasOwnProperty("clientTimeMs"))
                        if (typeof message.clientTimeMs === "number")
                            object.clientTimeMs = options.longs === String ? String(message.clientTimeMs) : message.clientTimeMs;
                        else
                            object.clientTimeMs = options.longs === String ? $util.Long.prototype.toString.call(message.clientTimeMs) : options.longs === Number ? new $util.LongBits(message.clientTimeMs.low >>> 0, message.clientTimeMs.high >>> 0).toNumber(true) : message.clientTimeMs;
                    if (message.hello != null && message.hasOwnProperty("hello")) {
                        object.hello = $root.jrland.world.v1.ClientHello.toObject(message.hello, options);
                        if (options.oneofs)
                            object.payload = "hello";
                    }
                    if (message.inputFrame != null && message.hasOwnProperty("inputFrame")) {
                        object.inputFrame = $root.jrland.world.v1.InputFrame.toObject(message.inputFrame, options);
                        if (options.oneofs)
                            object.payload = "inputFrame";
                    }
                    if (message.mineCommand != null && message.hasOwnProperty("mineCommand")) {
                        object.mineCommand = $root.jrland.world.v1.MineCommand.toObject(message.mineCommand, options);
                        if (options.oneofs)
                            object.payload = "mineCommand";
                    }
                    if (message.buildCommand != null && message.hasOwnProperty("buildCommand")) {
                        object.buildCommand = $root.jrland.world.v1.BuildCommand.toObject(message.buildCommand, options);
                        if (options.oneofs)
                            object.payload = "buildCommand";
                    }
                    if (message.craftCommand != null && message.hasOwnProperty("craftCommand")) {
                        object.craftCommand = $root.jrland.world.v1.CraftCommand.toObject(message.craftCommand, options);
                        if (options.oneofs)
                            object.payload = "craftCommand";
                    }
                    if (message.useCommand != null && message.hasOwnProperty("useCommand")) {
                        object.useCommand = $root.jrland.world.v1.UseCommand.toObject(message.useCommand, options);
                        if (options.oneofs)
                            object.payload = "useCommand";
                    }
                    if (message.chatLocal != null && message.hasOwnProperty("chatLocal")) {
                        object.chatLocal = $root.jrland.world.v1.ChatLocalMessage.toObject(message.chatLocal, options);
                        if (options.oneofs)
                            object.payload = "chatLocal";
                    }
                    if (message.ack != null && message.hasOwnProperty("ack")) {
                        object.ack = $root.jrland.world.v1.Ack.toObject(message.ack, options);
                        if (options.oneofs)
                            object.payload = "ack";
                    }
                    return object;
                };

                /**
                 * Converts this ClientEnvelope to JSON.
                 * @function toJSON
                 * @memberof jrland.world.v1.ClientEnvelope
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ClientEnvelope.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ClientEnvelope
                 * @function getTypeUrl
                 * @memberof jrland.world.v1.ClientEnvelope
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ClientEnvelope.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/jrland.world.v1.ClientEnvelope";
                };

                return ClientEnvelope;
            })();

            v1.ServerEnvelope = (function() {

                /**
                 * Properties of a ServerEnvelope.
                 * @memberof jrland.world.v1
                 * @interface IServerEnvelope
                 * @property {number|Long|null} [tick] ServerEnvelope tick
                 * @property {number|Long|null} [serverTimeMs] ServerEnvelope serverTimeMs
                 * @property {number|null} [baselineSeq] ServerEnvelope baselineSeq
                 * @property {jrland.world.v1.IWelcomeSnapshot|null} [welcome] ServerEnvelope welcome
                 * @property {jrland.world.v1.IWorldState|null} [worldState] ServerEnvelope worldState
                 * @property {jrland.world.v1.IChunkSnapshot|null} [chunkSnapshot] ServerEnvelope chunkSnapshot
                 * @property {jrland.world.v1.IChunkDelta|null} [chunkDelta] ServerEnvelope chunkDelta
                 * @property {jrland.world.v1.IInventoryDelta|null} [inventoryDelta] ServerEnvelope inventoryDelta
                 * @property {jrland.world.v1.IChatMessage|null} [chat] ServerEnvelope chat
                 * @property {jrland.world.v1.IHandoffPrepare|null} [handoffPrepare] ServerEnvelope handoffPrepare
                 * @property {jrland.world.v1.IHandoffCommit|null} [handoffCommit] ServerEnvelope handoffCommit
                 * @property {jrland.world.v1.IServerError|null} [error] ServerEnvelope error
                 * @property {jrland.world.v1.IAck|null} [ack] ServerEnvelope ack
                 * @property {jrland.world.v1.IEntityDelta|null} [entityDelta] ServerEnvelope entityDelta
                 */

                /**
                 * Constructs a new ServerEnvelope.
                 * @memberof jrland.world.v1
                 * @classdesc Represents a ServerEnvelope.
                 * @implements IServerEnvelope
                 * @constructor
                 * @param {jrland.world.v1.IServerEnvelope=} [properties] Properties to set
                 */
                function ServerEnvelope(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ServerEnvelope tick.
                 * @member {number|Long} tick
                 * @memberof jrland.world.v1.ServerEnvelope
                 * @instance
                 */
                ServerEnvelope.prototype.tick = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * ServerEnvelope serverTimeMs.
                 * @member {number|Long} serverTimeMs
                 * @memberof jrland.world.v1.ServerEnvelope
                 * @instance
                 */
                ServerEnvelope.prototype.serverTimeMs = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * ServerEnvelope baselineSeq.
                 * @member {number} baselineSeq
                 * @memberof jrland.world.v1.ServerEnvelope
                 * @instance
                 */
                ServerEnvelope.prototype.baselineSeq = 0;

                /**
                 * ServerEnvelope welcome.
                 * @member {jrland.world.v1.IWelcomeSnapshot|null|undefined} welcome
                 * @memberof jrland.world.v1.ServerEnvelope
                 * @instance
                 */
                ServerEnvelope.prototype.welcome = null;

                /**
                 * ServerEnvelope worldState.
                 * @member {jrland.world.v1.IWorldState|null|undefined} worldState
                 * @memberof jrland.world.v1.ServerEnvelope
                 * @instance
                 */
                ServerEnvelope.prototype.worldState = null;

                /**
                 * ServerEnvelope chunkSnapshot.
                 * @member {jrland.world.v1.IChunkSnapshot|null|undefined} chunkSnapshot
                 * @memberof jrland.world.v1.ServerEnvelope
                 * @instance
                 */
                ServerEnvelope.prototype.chunkSnapshot = null;

                /**
                 * ServerEnvelope chunkDelta.
                 * @member {jrland.world.v1.IChunkDelta|null|undefined} chunkDelta
                 * @memberof jrland.world.v1.ServerEnvelope
                 * @instance
                 */
                ServerEnvelope.prototype.chunkDelta = null;

                /**
                 * ServerEnvelope inventoryDelta.
                 * @member {jrland.world.v1.IInventoryDelta|null|undefined} inventoryDelta
                 * @memberof jrland.world.v1.ServerEnvelope
                 * @instance
                 */
                ServerEnvelope.prototype.inventoryDelta = null;

                /**
                 * ServerEnvelope chat.
                 * @member {jrland.world.v1.IChatMessage|null|undefined} chat
                 * @memberof jrland.world.v1.ServerEnvelope
                 * @instance
                 */
                ServerEnvelope.prototype.chat = null;

                /**
                 * ServerEnvelope handoffPrepare.
                 * @member {jrland.world.v1.IHandoffPrepare|null|undefined} handoffPrepare
                 * @memberof jrland.world.v1.ServerEnvelope
                 * @instance
                 */
                ServerEnvelope.prototype.handoffPrepare = null;

                /**
                 * ServerEnvelope handoffCommit.
                 * @member {jrland.world.v1.IHandoffCommit|null|undefined} handoffCommit
                 * @memberof jrland.world.v1.ServerEnvelope
                 * @instance
                 */
                ServerEnvelope.prototype.handoffCommit = null;

                /**
                 * ServerEnvelope error.
                 * @member {jrland.world.v1.IServerError|null|undefined} error
                 * @memberof jrland.world.v1.ServerEnvelope
                 * @instance
                 */
                ServerEnvelope.prototype.error = null;

                /**
                 * ServerEnvelope ack.
                 * @member {jrland.world.v1.IAck|null|undefined} ack
                 * @memberof jrland.world.v1.ServerEnvelope
                 * @instance
                 */
                ServerEnvelope.prototype.ack = null;

                /**
                 * ServerEnvelope entityDelta.
                 * @member {jrland.world.v1.IEntityDelta|null|undefined} entityDelta
                 * @memberof jrland.world.v1.ServerEnvelope
                 * @instance
                 */
                ServerEnvelope.prototype.entityDelta = null;

                // OneOf field names bound to virtual getters and setters
                let $oneOfFields;

                /**
                 * ServerEnvelope payload.
                 * @member {"welcome"|"worldState"|"chunkSnapshot"|"chunkDelta"|"inventoryDelta"|"chat"|"handoffPrepare"|"handoffCommit"|"error"|"ack"|"entityDelta"|undefined} payload
                 * @memberof jrland.world.v1.ServerEnvelope
                 * @instance
                 */
                Object.defineProperty(ServerEnvelope.prototype, "payload", {
                    get: $util.oneOfGetter($oneOfFields = ["welcome", "worldState", "chunkSnapshot", "chunkDelta", "inventoryDelta", "chat", "handoffPrepare", "handoffCommit", "error", "ack", "entityDelta"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new ServerEnvelope instance using the specified properties.
                 * @function create
                 * @memberof jrland.world.v1.ServerEnvelope
                 * @static
                 * @param {jrland.world.v1.IServerEnvelope=} [properties] Properties to set
                 * @returns {jrland.world.v1.ServerEnvelope} ServerEnvelope instance
                 */
                ServerEnvelope.create = function create(properties) {
                    return new ServerEnvelope(properties);
                };

                /**
                 * Encodes the specified ServerEnvelope message. Does not implicitly {@link jrland.world.v1.ServerEnvelope.verify|verify} messages.
                 * @function encode
                 * @memberof jrland.world.v1.ServerEnvelope
                 * @static
                 * @param {jrland.world.v1.IServerEnvelope} message ServerEnvelope message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ServerEnvelope.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.tick != null && Object.hasOwnProperty.call(message, "tick"))
                        writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.tick);
                    if (message.serverTimeMs != null && Object.hasOwnProperty.call(message, "serverTimeMs"))
                        writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.serverTimeMs);
                    if (message.baselineSeq != null && Object.hasOwnProperty.call(message, "baselineSeq"))
                        writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.baselineSeq);
                    if (message.welcome != null && Object.hasOwnProperty.call(message, "welcome"))
                        $root.jrland.world.v1.WelcomeSnapshot.encode(message.welcome, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
                    if (message.worldState != null && Object.hasOwnProperty.call(message, "worldState"))
                        $root.jrland.world.v1.WorldState.encode(message.worldState, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
                    if (message.chunkSnapshot != null && Object.hasOwnProperty.call(message, "chunkSnapshot"))
                        $root.jrland.world.v1.ChunkSnapshot.encode(message.chunkSnapshot, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
                    if (message.chunkDelta != null && Object.hasOwnProperty.call(message, "chunkDelta"))
                        $root.jrland.world.v1.ChunkDelta.encode(message.chunkDelta, writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
                    if (message.inventoryDelta != null && Object.hasOwnProperty.call(message, "inventoryDelta"))
                        $root.jrland.world.v1.InventoryDelta.encode(message.inventoryDelta, writer.uint32(/* id 14, wireType 2 =*/114).fork()).ldelim();
                    if (message.chat != null && Object.hasOwnProperty.call(message, "chat"))
                        $root.jrland.world.v1.ChatMessage.encode(message.chat, writer.uint32(/* id 15, wireType 2 =*/122).fork()).ldelim();
                    if (message.handoffPrepare != null && Object.hasOwnProperty.call(message, "handoffPrepare"))
                        $root.jrland.world.v1.HandoffPrepare.encode(message.handoffPrepare, writer.uint32(/* id 16, wireType 2 =*/130).fork()).ldelim();
                    if (message.handoffCommit != null && Object.hasOwnProperty.call(message, "handoffCommit"))
                        $root.jrland.world.v1.HandoffCommit.encode(message.handoffCommit, writer.uint32(/* id 17, wireType 2 =*/138).fork()).ldelim();
                    if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                        $root.jrland.world.v1.ServerError.encode(message.error, writer.uint32(/* id 18, wireType 2 =*/146).fork()).ldelim();
                    if (message.ack != null && Object.hasOwnProperty.call(message, "ack"))
                        $root.jrland.world.v1.Ack.encode(message.ack, writer.uint32(/* id 19, wireType 2 =*/154).fork()).ldelim();
                    if (message.entityDelta != null && Object.hasOwnProperty.call(message, "entityDelta"))
                        $root.jrland.world.v1.EntityDelta.encode(message.entityDelta, writer.uint32(/* id 20, wireType 2 =*/162).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified ServerEnvelope message, length delimited. Does not implicitly {@link jrland.world.v1.ServerEnvelope.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof jrland.world.v1.ServerEnvelope
                 * @static
                 * @param {jrland.world.v1.IServerEnvelope} message ServerEnvelope message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ServerEnvelope.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ServerEnvelope message from the specified reader or buffer.
                 * @function decode
                 * @memberof jrland.world.v1.ServerEnvelope
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jrland.world.v1.ServerEnvelope} ServerEnvelope
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ServerEnvelope.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.jrland.world.v1.ServerEnvelope();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.tick = reader.uint64();
                                break;
                            }
                        case 2: {
                                message.serverTimeMs = reader.uint64();
                                break;
                            }
                        case 3: {
                                message.baselineSeq = reader.uint32();
                                break;
                            }
                        case 10: {
                                message.welcome = $root.jrland.world.v1.WelcomeSnapshot.decode(reader, reader.uint32());
                                break;
                            }
                        case 11: {
                                message.worldState = $root.jrland.world.v1.WorldState.decode(reader, reader.uint32());
                                break;
                            }
                        case 12: {
                                message.chunkSnapshot = $root.jrland.world.v1.ChunkSnapshot.decode(reader, reader.uint32());
                                break;
                            }
                        case 13: {
                                message.chunkDelta = $root.jrland.world.v1.ChunkDelta.decode(reader, reader.uint32());
                                break;
                            }
                        case 14: {
                                message.inventoryDelta = $root.jrland.world.v1.InventoryDelta.decode(reader, reader.uint32());
                                break;
                            }
                        case 15: {
                                message.chat = $root.jrland.world.v1.ChatMessage.decode(reader, reader.uint32());
                                break;
                            }
                        case 16: {
                                message.handoffPrepare = $root.jrland.world.v1.HandoffPrepare.decode(reader, reader.uint32());
                                break;
                            }
                        case 17: {
                                message.handoffCommit = $root.jrland.world.v1.HandoffCommit.decode(reader, reader.uint32());
                                break;
                            }
                        case 18: {
                                message.error = $root.jrland.world.v1.ServerError.decode(reader, reader.uint32());
                                break;
                            }
                        case 19: {
                                message.ack = $root.jrland.world.v1.Ack.decode(reader, reader.uint32());
                                break;
                            }
                        case 20: {
                                message.entityDelta = $root.jrland.world.v1.EntityDelta.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ServerEnvelope message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof jrland.world.v1.ServerEnvelope
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {jrland.world.v1.ServerEnvelope} ServerEnvelope
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ServerEnvelope.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ServerEnvelope message.
                 * @function verify
                 * @memberof jrland.world.v1.ServerEnvelope
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ServerEnvelope.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    let properties = {};
                    if (message.tick != null && message.hasOwnProperty("tick"))
                        if (!$util.isInteger(message.tick) && !(message.tick && $util.isInteger(message.tick.low) && $util.isInteger(message.tick.high)))
                            return "tick: integer|Long expected";
                    if (message.serverTimeMs != null && message.hasOwnProperty("serverTimeMs"))
                        if (!$util.isInteger(message.serverTimeMs) && !(message.serverTimeMs && $util.isInteger(message.serverTimeMs.low) && $util.isInteger(message.serverTimeMs.high)))
                            return "serverTimeMs: integer|Long expected";
                    if (message.baselineSeq != null && message.hasOwnProperty("baselineSeq"))
                        if (!$util.isInteger(message.baselineSeq))
                            return "baselineSeq: integer expected";
                    if (message.welcome != null && message.hasOwnProperty("welcome")) {
                        properties.payload = 1;
                        {
                            let error = $root.jrland.world.v1.WelcomeSnapshot.verify(message.welcome);
                            if (error)
                                return "welcome." + error;
                        }
                    }
                    if (message.worldState != null && message.hasOwnProperty("worldState")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.jrland.world.v1.WorldState.verify(message.worldState);
                            if (error)
                                return "worldState." + error;
                        }
                    }
                    if (message.chunkSnapshot != null && message.hasOwnProperty("chunkSnapshot")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.jrland.world.v1.ChunkSnapshot.verify(message.chunkSnapshot);
                            if (error)
                                return "chunkSnapshot." + error;
                        }
                    }
                    if (message.chunkDelta != null && message.hasOwnProperty("chunkDelta")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.jrland.world.v1.ChunkDelta.verify(message.chunkDelta);
                            if (error)
                                return "chunkDelta." + error;
                        }
                    }
                    if (message.inventoryDelta != null && message.hasOwnProperty("inventoryDelta")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.jrland.world.v1.InventoryDelta.verify(message.inventoryDelta);
                            if (error)
                                return "inventoryDelta." + error;
                        }
                    }
                    if (message.chat != null && message.hasOwnProperty("chat")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.jrland.world.v1.ChatMessage.verify(message.chat);
                            if (error)
                                return "chat." + error;
                        }
                    }
                    if (message.handoffPrepare != null && message.hasOwnProperty("handoffPrepare")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.jrland.world.v1.HandoffPrepare.verify(message.handoffPrepare);
                            if (error)
                                return "handoffPrepare." + error;
                        }
                    }
                    if (message.handoffCommit != null && message.hasOwnProperty("handoffCommit")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.jrland.world.v1.HandoffCommit.verify(message.handoffCommit);
                            if (error)
                                return "handoffCommit." + error;
                        }
                    }
                    if (message.error != null && message.hasOwnProperty("error")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.jrland.world.v1.ServerError.verify(message.error);
                            if (error)
                                return "error." + error;
                        }
                    }
                    if (message.ack != null && message.hasOwnProperty("ack")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.jrland.world.v1.Ack.verify(message.ack);
                            if (error)
                                return "ack." + error;
                        }
                    }
                    if (message.entityDelta != null && message.hasOwnProperty("entityDelta")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.jrland.world.v1.EntityDelta.verify(message.entityDelta);
                            if (error)
                                return "entityDelta." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a ServerEnvelope message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof jrland.world.v1.ServerEnvelope
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {jrland.world.v1.ServerEnvelope} ServerEnvelope
                 */
                ServerEnvelope.fromObject = function fromObject(object) {
                    if (object instanceof $root.jrland.world.v1.ServerEnvelope)
                        return object;
                    let message = new $root.jrland.world.v1.ServerEnvelope();
                    if (object.tick != null)
                        if ($util.Long)
                            (message.tick = $util.Long.fromValue(object.tick)).unsigned = true;
                        else if (typeof object.tick === "string")
                            message.tick = parseInt(object.tick, 10);
                        else if (typeof object.tick === "number")
                            message.tick = object.tick;
                        else if (typeof object.tick === "object")
                            message.tick = new $util.LongBits(object.tick.low >>> 0, object.tick.high >>> 0).toNumber(true);
                    if (object.serverTimeMs != null)
                        if ($util.Long)
                            (message.serverTimeMs = $util.Long.fromValue(object.serverTimeMs)).unsigned = true;
                        else if (typeof object.serverTimeMs === "string")
                            message.serverTimeMs = parseInt(object.serverTimeMs, 10);
                        else if (typeof object.serverTimeMs === "number")
                            message.serverTimeMs = object.serverTimeMs;
                        else if (typeof object.serverTimeMs === "object")
                            message.serverTimeMs = new $util.LongBits(object.serverTimeMs.low >>> 0, object.serverTimeMs.high >>> 0).toNumber(true);
                    if (object.baselineSeq != null)
                        message.baselineSeq = object.baselineSeq >>> 0;
                    if (object.welcome != null) {
                        if (typeof object.welcome !== "object")
                            throw TypeError(".jrland.world.v1.ServerEnvelope.welcome: object expected");
                        message.welcome = $root.jrland.world.v1.WelcomeSnapshot.fromObject(object.welcome);
                    }
                    if (object.worldState != null) {
                        if (typeof object.worldState !== "object")
                            throw TypeError(".jrland.world.v1.ServerEnvelope.worldState: object expected");
                        message.worldState = $root.jrland.world.v1.WorldState.fromObject(object.worldState);
                    }
                    if (object.chunkSnapshot != null) {
                        if (typeof object.chunkSnapshot !== "object")
                            throw TypeError(".jrland.world.v1.ServerEnvelope.chunkSnapshot: object expected");
                        message.chunkSnapshot = $root.jrland.world.v1.ChunkSnapshot.fromObject(object.chunkSnapshot);
                    }
                    if (object.chunkDelta != null) {
                        if (typeof object.chunkDelta !== "object")
                            throw TypeError(".jrland.world.v1.ServerEnvelope.chunkDelta: object expected");
                        message.chunkDelta = $root.jrland.world.v1.ChunkDelta.fromObject(object.chunkDelta);
                    }
                    if (object.inventoryDelta != null) {
                        if (typeof object.inventoryDelta !== "object")
                            throw TypeError(".jrland.world.v1.ServerEnvelope.inventoryDelta: object expected");
                        message.inventoryDelta = $root.jrland.world.v1.InventoryDelta.fromObject(object.inventoryDelta);
                    }
                    if (object.chat != null) {
                        if (typeof object.chat !== "object")
                            throw TypeError(".jrland.world.v1.ServerEnvelope.chat: object expected");
                        message.chat = $root.jrland.world.v1.ChatMessage.fromObject(object.chat);
                    }
                    if (object.handoffPrepare != null) {
                        if (typeof object.handoffPrepare !== "object")
                            throw TypeError(".jrland.world.v1.ServerEnvelope.handoffPrepare: object expected");
                        message.handoffPrepare = $root.jrland.world.v1.HandoffPrepare.fromObject(object.handoffPrepare);
                    }
                    if (object.handoffCommit != null) {
                        if (typeof object.handoffCommit !== "object")
                            throw TypeError(".jrland.world.v1.ServerEnvelope.handoffCommit: object expected");
                        message.handoffCommit = $root.jrland.world.v1.HandoffCommit.fromObject(object.handoffCommit);
                    }
                    if (object.error != null) {
                        if (typeof object.error !== "object")
                            throw TypeError(".jrland.world.v1.ServerEnvelope.error: object expected");
                        message.error = $root.jrland.world.v1.ServerError.fromObject(object.error);
                    }
                    if (object.ack != null) {
                        if (typeof object.ack !== "object")
                            throw TypeError(".jrland.world.v1.ServerEnvelope.ack: object expected");
                        message.ack = $root.jrland.world.v1.Ack.fromObject(object.ack);
                    }
                    if (object.entityDelta != null) {
                        if (typeof object.entityDelta !== "object")
                            throw TypeError(".jrland.world.v1.ServerEnvelope.entityDelta: object expected");
                        message.entityDelta = $root.jrland.world.v1.EntityDelta.fromObject(object.entityDelta);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a ServerEnvelope message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof jrland.world.v1.ServerEnvelope
                 * @static
                 * @param {jrland.world.v1.ServerEnvelope} message ServerEnvelope
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ServerEnvelope.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        if ($util.Long) {
                            let long = new $util.Long(0, 0, true);
                            object.tick = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.tick = options.longs === String ? "0" : 0;
                        if ($util.Long) {
                            let long = new $util.Long(0, 0, true);
                            object.serverTimeMs = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.serverTimeMs = options.longs === String ? "0" : 0;
                        object.baselineSeq = 0;
                    }
                    if (message.tick != null && message.hasOwnProperty("tick"))
                        if (typeof message.tick === "number")
                            object.tick = options.longs === String ? String(message.tick) : message.tick;
                        else
                            object.tick = options.longs === String ? $util.Long.prototype.toString.call(message.tick) : options.longs === Number ? new $util.LongBits(message.tick.low >>> 0, message.tick.high >>> 0).toNumber(true) : message.tick;
                    if (message.serverTimeMs != null && message.hasOwnProperty("serverTimeMs"))
                        if (typeof message.serverTimeMs === "number")
                            object.serverTimeMs = options.longs === String ? String(message.serverTimeMs) : message.serverTimeMs;
                        else
                            object.serverTimeMs = options.longs === String ? $util.Long.prototype.toString.call(message.serverTimeMs) : options.longs === Number ? new $util.LongBits(message.serverTimeMs.low >>> 0, message.serverTimeMs.high >>> 0).toNumber(true) : message.serverTimeMs;
                    if (message.baselineSeq != null && message.hasOwnProperty("baselineSeq"))
                        object.baselineSeq = message.baselineSeq;
                    if (message.welcome != null && message.hasOwnProperty("welcome")) {
                        object.welcome = $root.jrland.world.v1.WelcomeSnapshot.toObject(message.welcome, options);
                        if (options.oneofs)
                            object.payload = "welcome";
                    }
                    if (message.worldState != null && message.hasOwnProperty("worldState")) {
                        object.worldState = $root.jrland.world.v1.WorldState.toObject(message.worldState, options);
                        if (options.oneofs)
                            object.payload = "worldState";
                    }
                    if (message.chunkSnapshot != null && message.hasOwnProperty("chunkSnapshot")) {
                        object.chunkSnapshot = $root.jrland.world.v1.ChunkSnapshot.toObject(message.chunkSnapshot, options);
                        if (options.oneofs)
                            object.payload = "chunkSnapshot";
                    }
                    if (message.chunkDelta != null && message.hasOwnProperty("chunkDelta")) {
                        object.chunkDelta = $root.jrland.world.v1.ChunkDelta.toObject(message.chunkDelta, options);
                        if (options.oneofs)
                            object.payload = "chunkDelta";
                    }
                    if (message.inventoryDelta != null && message.hasOwnProperty("inventoryDelta")) {
                        object.inventoryDelta = $root.jrland.world.v1.InventoryDelta.toObject(message.inventoryDelta, options);
                        if (options.oneofs)
                            object.payload = "inventoryDelta";
                    }
                    if (message.chat != null && message.hasOwnProperty("chat")) {
                        object.chat = $root.jrland.world.v1.ChatMessage.toObject(message.chat, options);
                        if (options.oneofs)
                            object.payload = "chat";
                    }
                    if (message.handoffPrepare != null && message.hasOwnProperty("handoffPrepare")) {
                        object.handoffPrepare = $root.jrland.world.v1.HandoffPrepare.toObject(message.handoffPrepare, options);
                        if (options.oneofs)
                            object.payload = "handoffPrepare";
                    }
                    if (message.handoffCommit != null && message.hasOwnProperty("handoffCommit")) {
                        object.handoffCommit = $root.jrland.world.v1.HandoffCommit.toObject(message.handoffCommit, options);
                        if (options.oneofs)
                            object.payload = "handoffCommit";
                    }
                    if (message.error != null && message.hasOwnProperty("error")) {
                        object.error = $root.jrland.world.v1.ServerError.toObject(message.error, options);
                        if (options.oneofs)
                            object.payload = "error";
                    }
                    if (message.ack != null && message.hasOwnProperty("ack")) {
                        object.ack = $root.jrland.world.v1.Ack.toObject(message.ack, options);
                        if (options.oneofs)
                            object.payload = "ack";
                    }
                    if (message.entityDelta != null && message.hasOwnProperty("entityDelta")) {
                        object.entityDelta = $root.jrland.world.v1.EntityDelta.toObject(message.entityDelta, options);
                        if (options.oneofs)
                            object.payload = "entityDelta";
                    }
                    return object;
                };

                /**
                 * Converts this ServerEnvelope to JSON.
                 * @function toJSON
                 * @memberof jrland.world.v1.ServerEnvelope
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ServerEnvelope.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ServerEnvelope
                 * @function getTypeUrl
                 * @memberof jrland.world.v1.ServerEnvelope
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ServerEnvelope.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/jrland.world.v1.ServerEnvelope";
                };

                return ServerEnvelope;
            })();

            return v1;
        })();

        return world;
    })();

    return jrland;
})();

export { $root as default };
