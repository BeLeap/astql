export default `[
  Constructor(ArrayBuffer buffer,
              optional unsigned long byteOffset,
              optional unsigned long byteLength)
]
interface DataViewExample {
    // Gets the value of the given type at the specified byte offset
    // from the start of the view. There is no alignment constraint;
    // multi-byte values may be fetched from any offset.
    //
    // For multi-byte values, the optional littleEndian argument
    // indicates whether a big-endian or little-endian value should be
    // read. If false or undefined, a big-endian value is read.
    //
    // These methods raise an exception if they would read
    // beyond the end of the view.
    byte getInt8(unsigned long byteOffset);
    octet getUint8(unsigned long byteOffset);
    short getInt16(unsigned long byteOffset,
                   optional boolean littleEndian);
    unsigned short getUint16(unsigned long byteOffset,
                             optional boolean littleEndian);
    long getInt32(unsigned long byteOffset,
                  optional boolean littleEndian);
    unsigned long getUint32(unsigned long byteOffset,
                            optional boolean littleEndian);
    float getFloat32(unsigned long byteOffset,
                     optional boolean littleEndian);
    double getFloat64(unsigned long byteOffset,
                      optional boolean littleEndian);

    // Stores a value of the given type at the specified byte offset
    // from the start of the view. There is no alignment constraint;
    // multi-byte values may be stored at any offset.
    //
    // For multi-byte values, the optional littleEndian argument
    // indicates whether the value should be stored in big-endian or
    // little-endian byte order. If false or undefined, the value is
    // stored in big-endian byte order.
    //
    // These methods raise an exception if they would write
    // beyond the end of the view.
    void setInt8(unsigned long byteOffset,
                 byte value);
    void setUint8(unsigned long byteOffset,
                  octet value);
    void setInt16(unsigned long byteOffset,
                  short value,
                  optional boolean littleEndian);
    void setUint16(unsigned long byteOffset,
                   unsigned short value,
                   optional boolean littleEndian);
    void setInt32(unsigned long byteOffset,
                  long value,
                  optional boolean littleEndian);
    void setUint32(unsigned long byteOffset,
                   unsigned long value,
                   optional boolean littleEndian);
    void setFloat32(unsigned long byteOffset,
                    float value,
                    optional boolean littleEndian);
    void setFloat64(unsigned long byteOffset,
                    double value,
                    optional boolean littleEndian);
};
`;
