using System;


namespace Domain
{
    // data type od userId might be string instead of guid, keep in mind
    public class Post
    {
        public Guid ID { get; set; }
        public string Location { get; set; }
        public Guid UserID { get; set; }
 
        public string Title { get; set; }
        public string Description { get; set; }
        public string PetType { get; set; }
        public string StatusType { get; set; }
        public DateTime Date {get;set;}
    }
    
}
