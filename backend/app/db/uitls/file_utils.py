import os
import sys
import json

def get_resource_path(filename: str) -> str:
    if getattr(sys, 'frozen', False):
        if sys.platform == "win32":
            base_path = os.path.join(os.path.expanduser("~"), "AppData", "Roaming", "quick_notes")
        elif sys.platform == "darwin":
            base_path = os.path.join(os.path.expanduser("~"), "Library", "Application Support", "quick_notes")
        else:
            base_path = os.path.join(os.path.expanduser("~"), ".local", "share", "quick_notes")
    else:
        base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "app_data"))
        
    if not os.path.exists(base_path):
        os.makedirs(base_path)
            
    file_path = os.path.join(base_path, filename)
        
    if not os.path.exists(file_path):
        with open(file_path, 'w') as f:
            json.dump([], f) 
                
    return file_path