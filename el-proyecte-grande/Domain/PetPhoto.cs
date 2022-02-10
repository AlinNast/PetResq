using System;

namespace Domain
{
    public class PetPhoto
    {
        public Guid ID { get; set; }
        public string Path { get; set; }

        // might want to add Name prop
        public Guid PostID { get; set; }
    }
}
