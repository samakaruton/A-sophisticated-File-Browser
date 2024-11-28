from flask import Flask, request, jsonify, send_file
import os
import platform
import shutil
from flask_cors import CORS
import ctypes
import sys

app = Flask(__name__)
CORS(app)

# Directories to manage
USER_DIRECTORIES = {
    "desktop": os.path.join(os.path.expanduser("~"), "Desktop"),
    "documents": os.path.join(os.path.expanduser("~"), "Documents"),
    "downloads": os.path.join(os.path.expanduser("~"), "Downloads"),
    "home": os.path.expanduser("~"),
    "c_drive": "C:\\",
    "network_share": "\\\\network-share-path"  # Replace with actual network share path
}

def is_admin():
    try:
        return ctypes.windll.shell32.IsUserAnAdmin()
    except:
        return False

if not is_admin():
    ctypes.windll.shell32.ShellExecuteW(
        None, "runas", sys.executable, " ".join(sys.argv), None, 1
    )
    sys.exit()


# Dynamic route for directories
@app.route('/api/list/<directory>', methods=['GET'])
def get_files_by_directory(directory):
    if directory not in USER_DIRECTORIES:
        return jsonify({"error": f"Unknown directory '{directory}'"}), 400

    path = USER_DIRECTORIES[directory]
    files = list_files(path)
    return jsonify(files)


# Base directory for file operations
ROOT_DIRECTORY = os.path.expanduser("~")  # User's home directory

# Helper function to list files and directories
def list_files(directory):
    try:
        return [
            {
                "name": entry.name,
                "path": entry.path,
                "is_directory": entry.is_dir(),
                "size": os.path.getsize(entry) // 1024,  # Size in KB
                "description": "",  # Description can be updated later
            }
            for entry in os.scandir(directory)
        ]
    except Exception as e:
        return {"error": str(e)}

@app.route('/api/desktop-path', methods=['GET'])
def get_desktop_path():
    try:
        system = platform.system()
        if system == "Windows":
            home_dir = os.path.expanduser("~")
            desktop_path = os.path.join(home_dir, "Desktop")
        elif system == "Darwin":  # macOS
            home_dir = os.path.expanduser("~")
            desktop_path = os.path.join(home_dir, "Desktop")
        elif system == "Linux":
            home_dir = os.path.expanduser("~")
            desktop_path = os.path.join(home_dir, "Desktop")
        else:
            return jsonify({"error": f"Unsupported OS: {system}"}), 400

        if not os.path.exists(desktop_path):
            return jsonify({"error": "Desktop path not found"}), 404

        return jsonify({"path": desktop_path})
    except Exception as e:
        print(f"Error retrieving desktop path: {e}")
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/documents-path', methods=['GET'])
def get_documents_path():
    try:
        system = platform.system()
        if system == "Windows":
            home_dir = os.path.expanduser("~")
            desktop_path = os.path.join(home_dir, "Documents")
        elif system == "Darwin":  # macOS
            home_dir = os.path.expanduser("~")
            desktop_path = os.path.join(home_dir, "Documents")
        elif system == "Linux":
            home_dir = os.path.expanduser("~")
            desktop_path = os.path.join(home_dir, "Documents")
        else:
            return jsonify({"error": f"Unsupported OS: {system}"}), 400

        if not os.path.exists(desktop_path):
            return jsonify({"error": "Documents path not found"}), 404

        return jsonify({"path": desktop_path})
    except Exception as e:
        print(f"Error retrieving desktop path: {e}")
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/download-path', methods=['GET'])
def get_downloads_path():
    try:
        system = platform.system()
        if system == "Windows":
            home_dir = os.path.expanduser("~")
            desktop_path = os.path.join(home_dir, "Downloads")
        elif system == "Darwin":  # macOS
            home_dir = os.path.expanduser("~")
            desktop_path = os.path.join(home_dir, "Downloads")
        elif system == "Linux":
            home_dir = os.path.expanduser("~")
            desktop_path = os.path.join(home_dir, "Downloads")
        else:
            return jsonify({"error": f"Unsupported OS: {system}"}), 400

        if not os.path.exists(desktop_path):
            return jsonify({"error": "Downloadss path not found"}), 404

        return jsonify({"path": desktop_path})
    except Exception as e:
        print(f"Error retrieving desktop path: {e}")
        return jsonify({"error": str(e)}), 500
    

@app.route('/api/Hard-Drive-path', methods=['GET'])
def get_hard_drive_path():
    try:
        system = platform.system()
        if system == "Windows":
            # For Windows, you can get the system drive (usually C:)
            hard_drive_path = os.getenv("SystemDrive", "C:") + "\\"
        elif system == "Darwin":  # macOS
            # On macOS, root is typically "/"
            hard_drive_path = "/"
        elif system == "Linux":
            # On Linux, root is also typically "/"
            hard_drive_path = "/"
        else:
            return jsonify({"error": f"Unsupported OS: {system}"}), 400

        if not os.path.exists(hard_drive_path):
            return jsonify({"error": "Hard drive path not found"}), 404

        return jsonify({"path": hard_drive_path})

    except Exception as e:
        print(f"Error retrieving hard drive path: {e}")
        return jsonify({"error": str(e)}), 500


# Route: Get files in a directory
@app.route('/api/files', methods=['GET'])
def get_files():
    path = request.args.get('path', ROOT_DIRECTORY)
    try:
        files = list_files(path)
        return jsonify(files)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

# Route: Open a file
@app.route('/api/open', methods=['POST'])
def open_file():
    data = request.json
    file_path = data.get('filePath')

    if not file_path or not os.path.isfile(file_path):
        return jsonify({"error": "Invalid file path"}), 400

    try:
        os.startfile(file_path)  # Opens the file with its default application
        return jsonify({"message": "File opened successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Route: Open a folder
@app.route('/api/open-folder', methods=['POST'])
def open_folder():
    data = request.json
    folder_path = data.get('folderPath')

    if not folder_path or not os.path.isdir(folder_path):
        return jsonify({"error": "Invalid folder path"}), 400

    try:
        os.startfile(folder_path)  # Opens the folder in the default file explorer
        return jsonify({"message": "Folder opened successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route: Copy a file or directory
@app.route('/api/copy', methods=['POST'])
def copy_file():
    data = request.json
    source = data.get('filePath')
    destinations = data.get('destinationPaths')  # Accept multiple destinations as a list

    if not source or not destinations:
        return jsonify({"error": "Source and destination paths are required"}), 400

    successful_copies = []
    errors = []

    for destination in destinations:
        try:
            # Get the filename or directory name from the source
            file_name = os.path.basename(source)
            final_destination = os.path.join(destination, file_name)

            if os.path.isdir(source):
                # If source is a directory, copy it recursively
                shutil.copytree(source, final_destination)
            else:
                # If source is a file, copy it
                shutil.copy2(source, final_destination)

            successful_copies.append(final_destination)
        except FileExistsError:
            errors.append({"destination": destination, "error": "Destination already exists"})
        except Exception as e:
            errors.append({"destination": destination, "error": str(e)})

    return jsonify({
        "message": "Copy operation completed",
        "successful_copies": successful_copies,
        "errors": errors
    }), 207 if errors else 200  # Use 207 (Multi-Status) if some operations failed


# Route: Cut (move) a file or directory
@app.route('/api/cut', methods=['POST'])
def cut_file():
    data = request.json
    source = data.get('filePath')
    destination = data.get('destinationPath')

    if not source or not destination:
        return jsonify({"error": "Source and destination paths are required"}), 400

    try:
        # Get the filename or directory name from the source
        file_name = os.path.basename(source)
        final_destination = os.path.join(destination, file_name)

        # Move the file or directory
        shutil.move(source, final_destination)

        return jsonify({
            "message": "File moved successfully",
            "newPath": final_destination,
            "source": source
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route: Delete a file
@app.route('/api/delete', methods=['DELETE'])
def delete_file():
    data = request.json
    file_path = data.get('filePath')

    if not file_path:
        return jsonify({"error": "File path is required"}), 400

    try:
        if os.path.isdir(file_path):
            shutil.rmtree(file_path)
        else:
            os.remove(file_path)
        return jsonify({"message": "File deleted successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route: Rename a file
@app.route('/api/rename', methods=['PUT'])
def rename_file():
    data = request.json
    file_path = data.get('filePath')
    new_name = data.get('newName')

    if not file_path or not new_name:
        return jsonify({"error": "File path and new name are required"}), 400

    try:
        directory = os.path.dirname(file_path)
        new_path = os.path.join(directory, new_name)
        os.rename(file_path, new_path)
        return jsonify({"message": "File renamed successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/create_file', methods=['POST'])
def create_file():
    data = request.json
    path = data.get('path')
    file_name = data.get('fileName')
    if not path or not file_name:
        return jsonify({'error': 'Path and file name are required'}), 400

    try:
        full_path = os.path.join(path, file_name)
        with open(full_path, 'w') as f:
            f.write('')  # Create an empty file
        return jsonify({'message': 'File created successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/create_folder', methods=['POST'])
def create_folder():
    data = request.json
    path = data.get('path')
    folder_name = data.get('folderName')
    if not path or not folder_name:
        return jsonify({'error': 'Path and folder name are required'}), 400

    try:
        full_path = os.path.join(path, folder_name)
        os.makedirs(full_path)
        return jsonify({'message': 'Folder created successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/paste_file', methods=['POST'])
def paste_file():
    data = request.json
    source_path = data.get('sourcePath')
    destination_path = data.get('destinationPath')
    operation = data.get('operation')  # 'copy' or 'cut'
    
    if not source_path or not destination_path or not operation:
        return jsonify({'error': 'Source, destination, and operation are required'}), 400

    try:
        file_name = os.path.basename(source_path)
        destination = os.path.join(destination_path, file_name)
        
        if operation == 'copy':
            if os.path.isdir(source_path):
                shutil.copytree(source_path, destination)
            else:
                shutil.copy2(source_path, destination)
        elif operation == 'cut':
            shutil.move(source_path, destination)

        return jsonify({'message': f'File {operation}ed successfully'})
    except Exception as e:
        return jsonify({'error, this error was thrown': str(e)}), 500
    
@app.route('/debug/routes', methods=['GET'])
def list_routes():
    import urllib
    return jsonify({
        rule.endpoint: urllib.parse.unquote(rule.rule)
        for rule in app.url_map.iter_rules()
    })


if __name__ == '__main__':
    app.run(debug=True)
