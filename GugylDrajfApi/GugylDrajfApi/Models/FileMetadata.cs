using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GugylDrajfApi.Models
{
    public class FileMetadata
    {
        public FileMetadata(string name, DateTime lastModified, bool isArchieved)
        {
            Name = name;
            LastModified = lastModified;
            IsArchieved = isArchieved;
        }

        public string Name { get; set; }
        public DateTime LastModified { get; set; }
        public bool IsArchieved { get; set; }
    }
}
