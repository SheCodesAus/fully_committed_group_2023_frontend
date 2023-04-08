// RENDERED ON MENTORDETAILPAGE.JSX
//CSS
import "./MentorNoteCard.css";
function MentorNoteCard(props) {
    const { mentorNote } = props;
    return (
        
        <>
        <h4>{mentorNote.notes_type} by {mentorNote.noter}</h4>
            <div className="note-card">
                <div className="note-card-text">
                    <p>{new Date(mentorNote.created_on).toLocaleDateString()}</p>
                    <p>"{mentorNote.body}"</p>
                </div>
            </div>
        </>
    );
}
export default MentorNoteCard;