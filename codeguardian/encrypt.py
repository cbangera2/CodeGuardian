import json

def xor_encrypt_decrypt(data, key):
    """Encrypt or decrypt data using XOR and a key."""
    key_bytes = bytearray(key, 'utf-8')
    return bytes([data[i] ^ key_bytes[i % len(key_bytes)] for i in range(len(data))])

def encrypt_json(input_filename, output_filename, key):
    """Encrypt a JSON file."""
    with open(input_filename, 'r') as file:
        json_data = json.load(file)
    
    # Convert JSON data to string and then to bytes
    data_to_encrypt = json.dumps(json_data).encode('utf-8')
    
    # Encrypt the data
    encrypted_data = xor_encrypt_decrypt(data_to_encrypt, key)
    
    # Save the encrypted data to a new file
    with open(output_filename, 'wb') as file:
        file.write(encrypted_data)
    print(f"Encrypted data saved to {output_filename}")

def decrypt_json(input_filename, key):
    """Decrypt a previously encrypted JSON file and return the JSON object."""
    with open(input_filename, 'rb') as file:
        encrypted_data = file.read()
    
    # Decrypt the data
    decrypted_data = xor_encrypt_decrypt(encrypted_data, key)
    
    # Convert bytes back to JSON
    return json.loads(decrypted_data.decode('utf-8'))

# Example usage:
if __name__ == "__main__":
    key = "my_secret_key"  # Example key
    encrypt_json('updatedAnalytics.json', 'encrypted_file.dat', key)  # Encrypt and save to 'encrypted_file.dat'
    decrypted_json = decrypt_json('encrypted_file.dat', key)  # Decrypt and load the JSON data
    print(decrypted_json)  # Print the decrypted JSON data
    with open("./decryptedAnalytics.json", "w") as file:
        json.dump(decrypted_json, file, indent=2)
