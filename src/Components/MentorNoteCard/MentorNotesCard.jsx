// RENDERED ON MENTORDETAILPAGE.JSX
//CSS
import FormatDate from "../DateTime/FormatDate.jsx";
import "./MentorNoteCard.css";
function MentorNoteCard(props) {
    const { mentorNote } = props;
    return (
        
        <>
        <h4>{mentorNote.notes_type} by {mentorNote.noter}</h4>
            <div className="note-card">
                <div className="note-card-text">
                    <p>{FormatDate(mentorNote.created_on)}</p>
                    <p>"{mentorNote.body}"</p>
                </div>
            </div>
        </>
    );
}
export default MentorNoteCard;